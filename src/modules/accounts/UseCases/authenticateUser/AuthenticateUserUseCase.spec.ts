import 'reflect-metadata';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { hashSync } from 'bcryptjs';
import { AppError } from '../../../../shared/errors/AppError';

let authenticateUserUseCase: AuthenticateUserUseCase;

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

describe('Authenticate User', () => {
  beforeEach(() => {
    process.env.SECRET_TOKEN = 'dfdf';

    usersRepository.findByEmail.mockImplementation(() =>
      Promise.resolve({
        email: 'user@test.com',
        password: hashSync('123', 8),
        id: 'a',
      }),
    );

    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      email: 'user@test.com',
      password: '123',
      name: 'User Test',
    };

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
    expect(result.user.email).toEqual(user.email);
  });

  it('should not be able to authenticate an user with wrong password', async () => {
    const user: ICreateUserDTO = {
      email: 'user@test.com',
      password: '124',
      name: 'User Test',
    };

    const result = authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with non existent email', async () => {
    const user: ICreateUserDTO = {
      email: 'us@test.com',
      password: '123',
      name: 'User Test',
    };

    usersRepository.findByEmail.mockImplementationOnce(() => Promise.resolve());

    const result = authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).rejects.toBeInstanceOf(AppError);
  });
});
