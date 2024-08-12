import { UpdateResult } from 'typeorm';
import { Task, TaskStatus } from '../entities/Task';
import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO';

interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>;
  listPending(user_id: string): Promise<Task[]>;
  setStatus(id: string, status: TaskStatus): Promise<Task>;
  delete(id: string, user_id: string);
  listAll(user_id, option: TaskStatus): Promise<Task[]>;
  findByID(id: string): Promise<Task>;
}

export { ITasksRepository };
