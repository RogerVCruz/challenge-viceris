// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../../repositories/ITasksRepository';
import { Task, TaskStatus, taskStatusIsValid } from '../../entities/Task';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class SetStatusUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(id: string, status: TaskStatus): Promise<Task> {
    if (!taskStatusIsValid(status)) {
      throw new AppError('Invalid option! Choose: Done or Pending', 400);
    }
    return await this.tasksRepository.setStatus(id, status);
  }
}

export { SetStatusUseCase };
