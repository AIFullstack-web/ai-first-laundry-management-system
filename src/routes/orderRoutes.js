const express = require('express');
const orderController = require('../controllers/orderController');
const { validateCreateOrder, validateStatusUpdate } = require('../middleware/validateOrder');

const router = express.Router();

router.post('/', validateCreateOrder, orderController.createOrder);
router.get('/', orderController.listOrders);
router.patch('/:id/status', validateStatusUpdate, orderController.updateStatus);
router.get('/meta/pricing', orderController.supportedGarments);

module.exports = router;
