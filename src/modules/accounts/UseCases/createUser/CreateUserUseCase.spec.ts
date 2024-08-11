import 'reflect-metadata';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';

import { hashSync } from 'bcryptjs';

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

    const result = await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    expect(() => result).not.toThrow('User already exists!');
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

    expect(result).rejects.toThrow('User already exists!');
  });
});
