// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../../repositories/ITasksRepository';
import { Task, TaskStatus } from '../../entities/Task';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class ListTasksUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(user_id: string, status: TaskStatus): Promise<Task[]> {
    switch (status) {
      case TaskStatus.EMPTY:
      case TaskStatus.DONE:
      case TaskStatus.PENDING:
        break;
      default:
        throw new AppError('Invalid option! Choose: Done or Pending', 400);
    }
    return await this.tasksRepository.listAll(user_id, status);
  }
}

export { ListTasksUseCase };
