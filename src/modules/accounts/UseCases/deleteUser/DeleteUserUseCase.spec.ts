import 'reflect-metadata';

import { hashSync } from 'bcryptjs';
import { DeleteUserUseCase } from './DeleteUserUseCase';

let deleteUserUseCase: DeleteUserUseCase;

const usersRepositoryMock = () => ({
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  listAll: jest.fn(),
  findByEmail: jest.fn(),
  findByID: jest.fn(),
});

const usersRepository = usersRepositoryMock();

describe('Delete User', () => {
  beforeAll(() => {
    usersRepository.findByEmail.mockImplementation(() =>
      Promise.resolve({
        email: 'user@test.com',
        password: hashSync('123', 8),
        id: 'a',
      }),
    );

    deleteUserUseCase = new DeleteUserUseCase(usersRepository);
  });

  it('should be able to delete an user', async () => {
    const id = '1';

    const result = await deleteUserUseCase.execute(id);

    expect(() => result).not.toThrow(Error);
  });
});
