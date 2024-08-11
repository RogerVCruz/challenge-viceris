// eslint-disable-next-line import/no-extraneous-dependencies
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists!', 400);
    }

    const passwordHash = await hash(password,  parseInt(process.env.SALT));

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
