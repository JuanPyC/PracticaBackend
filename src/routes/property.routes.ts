import { Router } from 'express';
import * as propertyController from '../controllers/property.controller';

const router = Router();

router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getProperty);
router.post('/', propertyController.createProperty);
router.put('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

export default router;
