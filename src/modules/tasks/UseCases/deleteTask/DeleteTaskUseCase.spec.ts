import 'reflect-metadata';

import { DeleteTaskUseCase } from './DeleteTaskUseCase';

let deleteTaskUseCase: DeleteTaskUseCase;

const tasksRepositoryMock = () => ({
  create: jest.fn(),
  listPending: jest.fn(),
  setStatus: jest.fn(),
  delete: jest.fn(),
  listAll: jest.fn(),
  findByID: jest.fn(),
});

const tasksRepository = tasksRepositoryMock();

describe('Delete Task', () => {
  beforeAll(() => {
    deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository);
  });

  it('should be able to delete a Task', async () => {
    const id = '1';

    const result = await deleteTaskUseCase.execute(id, id);

    expect(tasksRepository.delete).toHaveBeenCalledWith(id, id);
    expect(() => result).not.toThrow(Error);
  });
});
