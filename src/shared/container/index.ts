// eslint-disable-next-line import/no-extraneous-dependencies
import { container } from 'tsyringe';

import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { ITasksRepository } from '../../modules/tasks/repositories/ITasksRepository';
import { TasksRepository } from '../../modules/tasks/repositories/implementations/TasksRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository,
);
