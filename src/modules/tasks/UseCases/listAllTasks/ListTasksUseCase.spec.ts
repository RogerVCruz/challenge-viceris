import 'reflect-metadata';
import { TaskStatus } from '../../entities/Task';
import { AppError } from '../../../../shared/errors/AppError';
import { ListTasksUseCase } from './ListTasksUseCase';

let listTaskUseCase: ListTasksUseCase;

const tasksRepositoryMock = () => ({
  create: jest.fn(),
  listPending: jest.fn(),
  setStatus: jest.fn(),
  delete: jest.fn(),
  listAll: jest.fn(),
  findByID: jest.fn(),
});

const tasksRepository = tasksRepositoryMock();

describe('List All Task', () => {
  beforeAll(() => {
    listTaskUseCase = new ListTasksUseCase(tasksRepository);
  });

  it('should be to list all Tasks', async () => {
    const user_id = '1';
    const option = TaskStatus.EMPTY;

    await listTaskUseCase.execute(user_id, option);

    expect(tasksRepository.listAll).toHaveBeenCalledWith(user_id, option);
  });

  it('should be to list all done Tasks', async () => {
    const user_id = '1';
    const option = TaskStatus.DONE;

    await listTaskUseCase.execute(user_id, option);

    expect(tasksRepository.listAll).toHaveBeenCalledWith(user_id, option);
  });

  it('should be to list all pending Tasks', async () => {
    const user_id = '1';
    const option = TaskStatus.PENDING;

    await listTaskUseCase.execute(user_id, option);

    expect(tasksRepository.listAll).toHaveBeenCalledWith(user_id, option);
  });

  it('should not be able to list Task with invalid option', async () => {
    const user_id = '1';
    const option = 'wrong option' as unknown as TaskStatus;

    const result = listTaskUseCase.execute(user_id, option);

    expect(result).rejects.toBeInstanceOf(AppError);
  });
});
