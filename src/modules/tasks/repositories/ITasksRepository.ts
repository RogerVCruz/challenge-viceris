import { UpdateResult } from 'typeorm';
import { Task } from '../entities/Task';
import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO';

interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<void>;
  listPending(user_id: string): Promise<Task[]>;
  setPending(id: string, status: boolean): Promise<Task>;
  // delete(id: string);
  // update(
  //   id: string,
  //   name: string,
  //   email: string,
  //   password: string,
  // ): Promise<UpdateResult>;
  listAll(user_id): Promise<Task[]>;
  // findByEmail(email: string): Promise<Task>;
  findByID(id: string): Promise<Task>;
}

export { ITasksRepository };
