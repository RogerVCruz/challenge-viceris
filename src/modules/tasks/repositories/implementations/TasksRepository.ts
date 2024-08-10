import { getRepository, Repository } from 'typeorm';
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO';
import { Task } from '../../entities/Task';
import { ITasksRepository } from '../ITasksRepository';

class TasksRepository implements ITasksRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = getRepository(Task);
  }

  async create({
    description,
    priority,
    user_id,
  }: ICreateTaskDTO): Promise<void> {
    const task = this.repository.create({
      description,
      priority,
      user: { id: user_id },
    });

    console.log(await this.repository.save(task));
  }

  async findByID(id: string): Promise<Task> {
    const task = await this.repository.findOne({ where: { id } });

    return task;
  }

  async listAll(user_id: string): Promise<Task[]> {
    const tasks = await this.repository.find({
      where: { user: { id: user_id } },
    });

    return tasks;
  }

  async listPending(user_id: string): Promise<Task[]> {
    return await this.repository.find({
      where: {
        user: { id: user_id },
        pending: true,
      },
    });
  }

  async setPending(id: string, status: boolean): Promise<Task> {
    const task = await this.findByID(id);

    task.pending = status;

    const updatedTask = await this.repository.save({ ...task });

    return updatedTask;
  }
}

export { TasksRepository };
