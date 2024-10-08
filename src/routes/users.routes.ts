import { Router } from 'express';
import { CreateUserController } from '../modules/accounts/UseCases/createUser/CreateUserController';
import { AuthenticateUserController } from '../modules/accounts/UseCases/authenticateUser/AuthenticateUserController';
import { authenticateMiddleware } from '../shared/infra/http/authenticateMiddleware';
import { UpdateUserController } from '../modules/accounts/UseCases/updateUser/UpdateUserController';
import { DeleteUserController } from '../modules/accounts/UseCases/deleteUser/DeleteUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const authenticateUseController = new AuthenticateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post('/create', createUserController.handle);

usersRoutes.put('/update', authenticateMiddleware, updateUserController.handle);

usersRoutes.delete(
  '/delete',
  authenticateMiddleware,
  deleteUserController.handle,
);

usersRoutes.post('/login', authenticateUseController.handle);

export { usersRoutes };
