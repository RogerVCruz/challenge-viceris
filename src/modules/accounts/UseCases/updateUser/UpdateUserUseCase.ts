// eslint-disable-next-line import/no-extraneous-dependencies
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id, name, email, password }: IUpdateUserDTO): Promise<void> {
    const emailMatch =
      (await this.usersRepository.findByID(id)).email === email;

    if (!emailMatch) {
      throw new AppError('Unauthorized email manipulation!', 401);
    }

    const passwordHash = await hash(password, process.env.SALT);

    await this.usersRepository.update(id, name, email, passwordHash);
  }
}

export { UpdateUserUseCase };
