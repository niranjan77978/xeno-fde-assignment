const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
// We use environment variables to keep passwords safe
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database Name
  process.env.DB_USER,     // Username (e.g., 'root')
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST, // Host (usually 'localhost')
    dialect: 'mysql', /* or 'postgres' if you chose PostgreSQL */
    logging: false,   // Set to true if you want to see raw SQL queries
  }
);

// Test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };