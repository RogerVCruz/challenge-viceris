import { getRepository, Repository } from 'typeorm';
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO';
import { priorityOptions, Task, TaskStatus } from '../../entities/Task';
import { ITasksRepository } from '../ITasksRepository';
import { AppError } from '../../../../shared/errors/AppError';

class TasksRepository implements ITasksRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = getRepository(Task);
  }

  async create({
    description,
    priority,
    user_id,
  }: ICreateTaskDTO): Promise<Task> {
    const task = this.repository.create({
      description,
      priority,
      user: { id: user_id },
    });

    return await this.repository.save(task);
  }

  async delete(id: string, user_id: string): Promise<void> {
    await this.repository.delete({ id, user: { id: user_id } });
  }

  async findByID(id: string): Promise<Task> {
    const task = await this.repository.findOne({ where: { id } });

    return task;
  }

  async listAll(user_id: string, status: TaskStatus): Promise<Task[]> {
    if (!status) {
      return this.repository.find({ where: { user: { id: user_id } } });
    }

    const tasks = await this.repository.find({
      where: { user: { id: user_id }, status },
    });

    return tasks;
  }

  async listPending(user_id: string): Promise<Task[]> {
    return this.repository.find({
      where: {
        user: { id: user_id },
        pending: true,
      },
    });
  }

  async update(
    id: string,
    description: string,
    status: TaskStatus,
    priority: priorityOptions,
  ): Promise<Task> {
    const task = await this.findByID(id);

    if (!task) throw new AppError("Task doesn't exists!", 404);

    task.description = description;
    task.status = status;
    task.priority = priority;

    const updatedTask = await this.repository.save({ ...task });

    return updatedTask;
  }
}

export { TasksRepository };
