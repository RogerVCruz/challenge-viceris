// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../../repositories/ITasksRepository';
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO';
import { priorityOptions } from '../../entities/Task';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({
    description,
    priority,
    user_id,
  }: ICreateTaskDTO): Promise<void> {
    if (!Object.values(priorityOptions).includes(priority)) {
      throw new AppError(
        'Invalid priority option! Choose: high, medium, low',
        400,
      );
    }

    await this.tasksRepository.create({
      description,
      priority,
      user_id,
    });
  }
}

export { CreateTaskUseCase };
