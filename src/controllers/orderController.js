const orderService = require('../services/orderService');

function createOrder(req, res) {
  const order = orderService.createOrder(req.body);

  return res.status(201).json({
    uniqueOrderId: order.id,
    totalAmount: order.totalAmount,
    status: order.status,
    order,
  });
}

function listOrders(req, res) {
  const { status, customerName, phoneNumber, garmentType } = req.query;

  const orders = orderService.getOrders({
    status,
    customerName,
    phoneNumber,
    garmentType,
  });

  return res.json({ count: orders.length, orders });
}

function updateStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const result = orderService.updateOrderStatus(id, status);

  if (result.error) {
    return res.status(result.code).json({ error: result.error });
  }

  return res.json({
    message: 'Order status updated successfully',
    order: result.data,
  });
}

function dashboard(req, res) {
  const data = orderService.getDashboardMetrics();
  return res.json(data);
}

function supportedGarments(req, res) {
  return res.json({ priceMap: orderService.getSupportedGarments() });
}

module.exports = {
  createOrder,
  listOrders,
  updateStatus,
  dashboard,
  supportedGarments,
};
