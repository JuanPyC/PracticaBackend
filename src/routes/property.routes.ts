import { Router } from 'express';
import * as propertyController from '../controllers/property.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getProperty);

// Protected routes
router.post('/', authenticateToken, propertyController.createProperty);
router.put('/:id', authenticateToken, propertyController.updateProperty);
router.delete('/:id', authenticateToken, propertyController.deleteProperty);

export default router;
