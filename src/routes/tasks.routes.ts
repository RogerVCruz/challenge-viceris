import { Router } from 'express';
import { authenticateMiddleware } from '../shared/infra/http/authenticateMiddleware';
import { CreateTaskController } from '../modules/tasks/UseCases/createTask/CreateTaskController';
import { SetStatusController } from '../modules/tasks/UseCases/setStatus/SetStatusController';
import { ListTasksController } from '../modules/tasks/UseCases/listAllTasks/ListTasksController';
import { DeleteTaskController } from '../modules/tasks/UseCases/deleteTask/DeleteTaskController';

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const setStatusController = new SetStatusController();
const listTasksController = new ListTasksController();
const deleteTaskController = new DeleteTaskController();

tasksRoutes.post(
  '/create',
  authenticateMiddleware,
  createTaskController.handle,
);

tasksRoutes.get('/', authenticateMiddleware, listTasksController.handle);

tasksRoutes.delete(
  '/delete/:id',
  authenticateMiddleware,
  deleteTaskController.handle,
);

tasksRoutes.post('/u/:id', authenticateMiddleware, setStatusController.handle);

export { tasksRoutes };
