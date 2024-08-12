// eslint-disable-next-line import/no-extraneous-dependencies
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { User } from '../../entities/User';
import { sign } from 'jsonwebtoken';

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<IResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists!', 400);
    }

    const passwordHash = await hash(password, parseInt(process.env.SALT));

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    const token = sign({}, process.env.SECRET_TOKEN, {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { CreateUserUseCase };
