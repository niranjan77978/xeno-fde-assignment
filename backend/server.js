const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/database');
require('dotenv').config();

// Models
const Tenant = require('./models/Tenant');
const Order = require('./models/Order');
const Customer = require('./models/Customer');

// Routes
const ingestRoutes = require('./routes/ingest'); 
const analyticsRoutes = require('./routes/analytics'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Register Routes
app.use('/api', ingestRoutes);
app.use('/api/analytics', analyticsRoutes); 

app.get('/', (req, res) => {
  res.send('✅ Xeno FDE Backend is Running!');
});

// STARTUP SEQUENCE
const startServer = async () => {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Sync Models
    await sequelize.sync({ alter: true });
    console.log('✅ All Tables synced successfully!');

    // 3. Start Listening (Keeps the process alive)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1); // Exit with failure code
  }
};

startServer();