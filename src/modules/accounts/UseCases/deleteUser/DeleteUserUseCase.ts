// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.usersRepository.delete(id);
  }
}

export { DeleteUserUseCase };
