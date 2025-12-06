const express = require('express');
const axios = require('axios');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');

// Helper function to talk to Shopify
const fetchShopifyData = async (endpoint, shop, token) => {
  const url = `https://${shop}/admin/api/2024-01/${endpoint}`;
  try {
    const response = await axios.get(url, {
      headers: { 'X-Shopify-Access-Token': token }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    return null;
  }
};

router.post('/sync-data', async (req, res) => {
  const SHOP = process.env.SHOP_DOMAIN;
  const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

  if (!SHOP || !TOKEN) {
    return res.status(500).json({ error: 'Missing Shopify Credentials in .env' });
  }

  try {
    console.log('🔄 Starting Shopify Data Sync...');

    // 1. Fetch & Save Customers
    const customerData = await fetchShopifyData('customers.json?limit=10', SHOP, TOKEN);
    if (customerData && customerData.customers) {
      for (const cust of customerData.customers) {
        await Customer.upsert({
          shopifyCustomerId: cust.id,
          firstName: cust.first_name,
          email: cust.email,
          totalSpent: cust.total_spent,
          shopId: SHOP
        });
      }
      console.log(`✅ Synced ${customerData.customers.length} Customers.`);
    }

    // 2. Fetch & Save Orders
    const orderData = await fetchShopifyData('orders.json?status=any&limit=50', SHOP, TOKEN);
    if (orderData && orderData.orders) {
      for (const order of orderData.orders) {
        await Order.upsert({
          shopifyOrderId: order.id,
          totalPrice: order.total_price,
          customerEmail: order.email,
          createdAtDate: order.created_at,
          shopId: SHOP
        });
      }
      console.log(`✅ Synced ${orderData.orders.length} Orders.`);
    }

    res.json({ success: true, message: 'Data Ingestion Complete' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sync Failed' });
  }
});

module.exports = router;