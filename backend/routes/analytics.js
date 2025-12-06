const express = require('express');
const { Op, Sequelize } = require('sequelize');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');

router.get('/total-sales', async (req, res) => {
  try {
    // Debug log to see if we get here
    console.log("📊 Calculating analytics..."); 

    // Check if models are loaded
    if (!Order || !Customer) {
      throw new Error("Models not loaded correctly");
    }

    const totalSales = await Order.sum('totalPrice') || 0;
    const totalOrders = await Order.count() || 0;
    const totalCustomers = await Customer.count() || 0;

    console.log("✅ Analytics calculated:", { totalSales, totalOrders, totalCustomers });

    res.json({
      totalSales: parseFloat(totalSales), // Ensure it sends a number
      totalOrders,
      totalCustomers
    });
  } catch (err) {
    console.error("❌ Analytics Error:", err.message); // Log the error instead of crashing
    res.status(500).json({ error: 'Failed to fetch sales data', details: err.message });
  }
});

router.get('/sales-over-time', async (req, res) => {
  try {
    const salesData = await Order.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAtDate')), 'date'],
        [Sequelize.fn('SUM', Sequelize.col('totalPrice')), 'amount']
      ],
      group: [Sequelize.fn('DATE', Sequelize.col('createdAtDate'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('createdAtDate')), 'ASC']]
    });

    res.json(salesData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch timeline data' });
  }
});

module.exports = router;