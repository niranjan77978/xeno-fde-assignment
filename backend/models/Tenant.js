const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Tenant = sequelize.define('Tenant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  shopDomain: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // 
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false, // Vital for making API calls 
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
});

module.exports = Tenant;