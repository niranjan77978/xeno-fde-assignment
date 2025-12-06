const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  shopifyCustomerId: {
    type: DataTypes.BIGINT,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  totalSpent: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  shopId: {
    type: DataTypes.STRING,
    allowNull: false, // MULTI-TENANCY ENFORCEMENT
  }
});

module.exports = Customer;