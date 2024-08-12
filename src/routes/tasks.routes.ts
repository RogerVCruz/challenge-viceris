import { Router } from 'express';
import { authenticateMiddleware } from '../shared/infra/http/authenticateMiddleware';
import { CreateTaskController } from '../modules/tasks/UseCases/createTask/CreateTaskController';

import { ListTasksController } from '../modules/tasks/UseCases/listAllTasks/ListTasksController';
import { DeleteTaskController } from '../modules/tasks/UseCases/deleteTask/DeleteTaskController';
import { UpdateTaskController } from '../modules/tasks/UseCases/updateTask/UpdateTaskController';

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const updateTaskController = new UpdateTaskController();
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

tasksRoutes.patch(
  '/update/:id',
  authenticateMiddleware,
  updateTaskController.handle,
);

export { tasksRoutes };
