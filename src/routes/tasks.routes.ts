import { Router } from 'express';
import { authenticateMiddleware } from '../shared/infra/http/authenticateMiddleware';
import { CreateTaskController } from '../modules/tasks/UseCases/createTask/CreateTaskController';
import { ListPendingController } from '../modules/tasks/UseCases/listPendingTasks/ListPendingTasksController';
import { SetPendingController } from '../modules/tasks/UseCases/setTaskStatus/SetPendingFalseController';
import { ListAllTasksController } from '../modules/tasks/UseCases/listAllTasks/ListAllTasksController';

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const listPendingTasksController = new ListPendingController();
const setPendingController = new SetPendingController();
const listAllTasksController = new ListAllTasksController();

tasksRoutes.post('/', authenticateMiddleware, createTaskController.handle);

tasksRoutes.get('/', authenticateMiddleware, listPendingTasksController.handle);

tasksRoutes.get('/all', authenticateMiddleware, listAllTasksController.handle);

tasksRoutes.patch('/:id', authenticateMiddleware, setPendingController.handle);

export { tasksRoutes };
