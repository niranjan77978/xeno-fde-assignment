const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  shopifyOrderId: {
    type: DataTypes.BIGINT, 
    unique: true,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  customerEmail: {
    type: DataTypes.STRING,
  },
  createdAtDate: {
    type: DataTypes.DATE, 
  },
  shopId: { 
    type: DataTypes.STRING,
    allowNull: false, // MULTI-TENANCY ENFORCEMENT
  }
});

module.exports = Order;