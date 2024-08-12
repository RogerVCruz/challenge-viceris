import { UpdateResult } from 'typeorm';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  update(
    id: string,
    name: string,
    email: string,
    password: string,
  ): Promise<UpdateResult>;
  listAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findByID(id: string): Promise<User>;
}

export { IUsersRepository };
