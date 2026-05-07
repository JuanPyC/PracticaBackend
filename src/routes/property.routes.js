const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property.controller');

// All routes are public for now as per "Omit JWT" request
router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getProperty);
router.post('/', propertyController.createProperty);
router.put('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
