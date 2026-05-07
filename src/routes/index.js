const express = require('express');
const router = express.Router();

// Import routes here
const propertyRoutes = require('./property.routes');

router.use('/properties', propertyRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

module.exports = router;
