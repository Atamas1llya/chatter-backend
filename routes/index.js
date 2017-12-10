import { Router } from 'express';
import authRoutes from './auth';

const api = Router();

api.use('/api', authRoutes);

export default api;
