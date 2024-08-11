// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../../repositories/ITasksRepository';

@injectable()
class DeleteTaskUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(id: string, user_id: string): Promise<void> {
    this.tasksRepository.delete(id, user_id);
  }
}

export { DeleteTaskUseCase };
