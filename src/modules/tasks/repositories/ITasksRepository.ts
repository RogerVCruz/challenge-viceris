import { UpdateResult } from 'typeorm';
import { priorityOptions, Task, TaskStatus } from '../entities/Task';
import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO';

interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>;
  listPending(user_id: string): Promise<Task[]>;
  update(
    id: string,
    description: string,
    status: TaskStatus,
    priority: priorityOptions,
  ): Promise<Task>;
  delete(id: string, user_id: string);
  listAll(user_id, option: TaskStatus): Promise<Task[]>;
  findByID(id: string): Promise<Task>;
}

export { ITasksRepository };
