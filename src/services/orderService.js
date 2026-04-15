const { randomUUID } = require('crypto');
const { PRICE_MAP } = require('../config/pricing');
const { orders } = require('../models/orderStore');

const ORDER_STATUSES = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

const VALID_TRANSITIONS = {
  RECEIVED: ['PROCESSING'],
  PROCESSING: ['READY'],
  READY: ['DELIVERED'],
  DELIVERED: [],
};

function normalizeGarmentType(type) {
  if (typeof type !== 'string') return '';
  return type.trim();
}

function computeTotal(garments) {
  return garments.reduce((acc, garment) => {
    const type = normalizeGarmentType(garment.type);
    const unitPrice = PRICE_MAP[type];
    return acc + garment.quantity * unitPrice;
  }, 0);
}

function createOrder({ customerName, phoneNumber, garments }) {
  const order = {
    id: randomUUID(),
    customerName: customerName.trim(),
    phoneNumber: phoneNumber.trim(),
    garments,
    totalAmount: computeTotal(garments),
    status: 'RECEIVED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(order);
  return order;
}

function getOrders(filters = {}) {
  return orders.filter((order) => {
    if (filters.status && order.status !== filters.status) return false;

    if (
      filters.customerName &&
      !order.customerName.toLowerCase().includes(filters.customerName.toLowerCase())
    ) {
      return false;
    }

    if (filters.phoneNumber && !order.phoneNumber.includes(filters.phoneNumber)) {
      return false;
    }

    if (filters.garmentType) {
      const hasGarmentType = order.garments.some(
        (garment) => garment.type.toLowerCase() === filters.garmentType.toLowerCase()
      );
      if (!hasGarmentType) return false;
    }

    return true;
  });
}

function getOrderById(id) {
  return orders.find((order) => order.id === id);
}

function updateOrderStatus(id, newStatus) {
  const order = getOrderById(id);
  if (!order) {
    return { error: 'Order not found', code: 404 };
  }

  if (!ORDER_STATUSES.includes(newStatus)) {
    return { error: 'Invalid status value', code: 400 };
  }

  const nextAllowed = VALID_TRANSITIONS[order.status];
  if (!nextAllowed.includes(newStatus)) {
    return {
      error: `Invalid status transition from ${order.status} to ${newStatus}`,
      code: 400,
    };
  }

  order.status = newStatus;
  order.updatedAt = new Date().toISOString();

  return { data: order };
}

function getDashboardMetrics() {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const statusCounts = ORDER_STATUSES.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {});

  orders.forEach((order) => {
    statusCounts[order.status] += 1;
  });

  return {
    totalOrders,
    totalRevenue,
    ordersByStatus: statusCounts,
  };
}

function getSupportedGarments() {
  return PRICE_MAP;
}

module.exports = {
  ORDER_STATUSES,
  createOrder,
  getOrders,
  updateOrderStatus,
  getDashboardMetrics,
  getSupportedGarments,
};
