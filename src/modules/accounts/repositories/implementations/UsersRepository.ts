import { Repository, UpdateResult, getRepository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);
  }

  async update(
    id: string,
    name: string,
    email: string,
    password: string,
  ): Promise<UpdateResult> {
    return await this.repository.update(
      { id },
      {
        name,
        email,
        password,
      },
    );
  }

  delete(id: string) {
    this.repository.delete({ id });
  }

  async listAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findByID(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }
}

export { UsersRepository };
