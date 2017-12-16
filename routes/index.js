import { Router } from 'express';

import authRoutes from './auth';
import profileRoutes from './user/profile';

const api = Router();

api.use('/api', authRoutes);
api.use('/api/user', profileRoutes);

export default api;
