import { Router } from 'express';
import { usersRoutes } from './users.routes';
import { tasksRoutes } from './tasks.routes';
import { authenticateMiddleware } from '../shared/infra/http/authenticateMiddleware';

const router = Router();

router.use('/users', usersRoutes);

router.use('/tasks', authenticateMiddleware, tasksRoutes);

export { router };
