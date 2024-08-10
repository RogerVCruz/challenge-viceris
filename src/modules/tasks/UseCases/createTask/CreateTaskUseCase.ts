// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../../repositories/ITasksRepository';
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO';

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
    await this.tasksRepository.create({
      description,
      priority,
      user_id,
    });
  }
}

export { CreateTaskUseCase };
