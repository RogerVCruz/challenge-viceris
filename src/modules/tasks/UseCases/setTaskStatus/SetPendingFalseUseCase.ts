// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../../repositories/ITasksRepository';
import { Task } from '../../entities/Task';

@injectable()
class SetPendingFalseUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(id: string, status: boolean): Promise<Task> {
    return await this.tasksRepository.setPending(id, status);
  }
}

export { SetPendingFalseUseCase };
