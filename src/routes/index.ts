import { Router } from 'express';
import authRoutes from './auth.routes';
import propertyRoutes from './property.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

export default router;
