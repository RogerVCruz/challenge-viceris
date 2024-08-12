import 'reflect-metadata';
import 'dotenv/config';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';

import { hashSync } from 'bcryptjs';
import { AppError } from '../../../../shared/errors/AppError';

let createUserUseCase: CreateUserUseCase;

const usersRepositoryMock = () => ({
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  listAll: jest.fn(),
  findByEmail: jest.fn(),
  findByID: jest.fn(),
});

const usersRepository = usersRepositoryMock();

describe('Create User', () => {
  beforeAll(() => {
    process.env.SECRET_TOKEN = 'dfdf';
    process.env.SALT = '8';

    usersRepository.findByEmail.mockImplementation(() =>
      Promise.resolve({
        email: 'user@test.com',
        password: hashSync('123', 8),
        id: 'a',
      }),
    );

    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create an user', async () => {
    const user: ICreateUserDTO = {
      email: 'user@test.com',
      password: '123',
      name: 'User Test',
    };

    usersRepository.findByEmail.mockImplementationOnce(() => Promise.resolve());
    usersRepository.create.mockImplementationOnce(() =>
      Promise.resolve({ id: 'teste id', ...user }),
    );

    const result = await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    expect(usersRepository.create).toHaveBeenCalled();
    expect(result).toHaveProperty('token');
    expect(result.user.email).toEqual(user.email);
    expect(result.user.name).toEqual(user.name);
  });

  it('should not be able to create an user', async () => {
    const user: ICreateUserDTO = {
      email: 'user@test.com',
      password: '123',
      name: 'User Test',
    };

    const result = createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    expect(result).rejects.toBeInstanceOf(AppError);
  });
});
