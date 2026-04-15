const { PRICE_MAP } = require('../config/pricing');

function validateCreateOrder(req, res, next) {
  const { customerName, phoneNumber, garments } = req.body;

  if (!customerName || typeof customerName !== 'string' || !customerName.trim()) {
    return res.status(400).json({ error: 'customerName is required and must be a non-empty string' });
  }

  if (!phoneNumber || typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
    return res.status(400).json({ error: 'phoneNumber is required and must be a non-empty string' });
  }

  if (!Array.isArray(garments) || garments.length === 0) {
    return res.status(400).json({ error: 'garments must be a non-empty array' });
  }

  for (const garment of garments) {
    if (!garment.type || typeof garment.type !== 'string' || !garment.type.trim()) {
      return res.status(400).json({ error: 'Each garment must include a valid type' });
    }

    if (!Number.isInteger(garment.quantity) || garment.quantity <= 0) {
      return res.status(400).json({ error: 'Each garment must include quantity as a positive integer' });
    }

    if (!Object.prototype.hasOwnProperty.call(PRICE_MAP, garment.type.trim())) {
      return res.status(400).json({
        error: `Unsupported garment type: ${garment.type}`,
        supportedTypes: Object.keys(PRICE_MAP),
      });
    }
  }

  return next();
}

function validateStatusUpdate(req, res, next) {
  const { status } = req.body;

  if (!status || typeof status !== 'string') {
    return res.status(400).json({ error: 'status is required and must be a string' });
  }

  return next();
}

module.exports = {
  validateCreateOrder,
  validateStatusUpdate,
};
