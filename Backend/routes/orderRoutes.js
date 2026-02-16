const express = require('express');
const { createOrder, getOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

// Logging middleware for order routes
router.use((req, res, next) => {
  console.log("🔵 [ROUTE] Order route hit:", req.method, req.path);
  console.log("🔵 [ROUTE] Timestamp:", new Date().toISOString());
  next();
});

router.get('/', getOrders);
router.post('/', (req, res, next) => {
  console.log("🔵 [ROUTE] POST /orders - Request received");
  console.log("🔵 [ROUTE] Body exists:", !!req.body);
  console.log("🔵 [ROUTE] Body keys:", req.body ? Object.keys(req.body) : 'no body');
  next();
}, createOrder);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;


