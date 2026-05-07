import { Router } from 'express';
import * as propertyController from '../controllers/property.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { 
  createPropertySchema, 
  updatePropertySchema, 
  getPropertySchema, 
  queryPropertySchema 
} from '../schemas/property.schema';

const router = Router();

// Public routes
router.get('/', validate(queryPropertySchema), propertyController.getProperties);
router.get('/:id', validate(getPropertySchema), propertyController.getProperty);

// Protected routes
router.post(
  '/', 
  authenticateToken, 
  validate(createPropertySchema), 
  propertyController.createProperty
);

router.put(
  '/:id', 
  authenticateToken, 
  validate(updatePropertySchema), 
  propertyController.updateProperty
);

router.delete(
  '/:id', 
  authenticateToken, 
  validate(getPropertySchema), 
  propertyController.deleteProperty
);

export default router;
