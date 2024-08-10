// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { User } from '../../entities/User';

@injectable()
class ListAllUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.listAll();
  }
}

export { ListAllUsersUseCase };
