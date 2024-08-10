// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../../repositories/ITasksRepository';
import { Task } from '../../entities/Task';

@injectable()
class ListAllTasksUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(user_id: string): Promise<Task[]> {
    return await this.tasksRepository.listAll(user_id);
  }
}

export { ListAllTasksUseCase };
