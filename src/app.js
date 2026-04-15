const { URL } = require('url');
const orderController = require('./controllers/orderController');
const { validateCreateOrder, validateStatusUpdate } = require('./middleware/validateOrder');

function attachResponseHelpers(res) {
  res.status = function status(code) {
    res.statusCode = code;
    return res;
  };

  res.json = function json(payload) {
    if (!res.statusCode) {
      res.statusCode = 200;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(payload));
  };
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', (chunk) => {
      raw += chunk;
    });

    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });

    req.on('error', reject);
  });
}

function runMiddleware(middleware, req, res) {
  return new Promise((resolve) => {
    middleware(req, res, () => resolve(true));
    if (res.writableEnded) {
      resolve(false);
    }
  });
}

async function app(req, res) {
  attachResponseHelpers(res);

  const requestUrl = new URL(req.url, 'http://localhost');
  const path = requestUrl.pathname;

  req.query = Object.fromEntries(requestUrl.searchParams.entries());
  req.params = {};

  try {
    if (req.method === 'POST' || req.method === 'PATCH') {
      req.body = await parseJsonBody(req);
    } else {
      req.body = {};
    }

    if (req.method === 'GET' && path === '/health') {
      return res.json({ status: 'ok' });
    }

    if (req.method === 'POST' && path === '/api/orders') {
      const canContinue = await runMiddleware(validateCreateOrder, req, res);
      if (!canContinue) return;
      return orderController.createOrder(req, res);
    }

    if (req.method === 'GET' && path === '/api/orders') {
      return orderController.listOrders(req, res);
    }

    if (req.method === 'GET' && path === '/api/orders/meta/pricing') {
      return orderController.supportedGarments(req, res);
    }

    if (req.method === 'GET' && path === '/api/dashboard') {
      return orderController.dashboard(req, res);
    }

    if (req.method === 'PATCH' && /^\/api\/orders\/[^/]+\/status$/.test(path)) {
      const canContinue = await runMiddleware(validateStatusUpdate, req, res);
      if (!canContinue) return;

      req.params.id = path.split('/')[3];
      return orderController.updateStatus(req, res);
    }

    return res.status(404).json({ error: 'Route not found' });
  } catch (error) {
    if (error.message === 'Invalid JSON body') {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = app;
