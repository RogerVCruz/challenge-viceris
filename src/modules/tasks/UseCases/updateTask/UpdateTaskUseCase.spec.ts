import 'reflect-metadata';
import { priorityOptions, TaskStatus } from '../../entities/Task';
import { AppError } from '../../../../shared/errors/AppError';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

let updateTaskUseCase: UpdateTaskUseCase;

const tasksRepositoryMock = () => ({
  create: jest.fn(),
  listPending: jest.fn(),
  delete: jest.fn(),
  listAll: jest.fn(),
  findByID: jest.fn(),
  update: jest.fn(),
});

const tasksRepository = tasksRepositoryMock();

describe('Update Task ', () => {
  beforeAll(() => {
    updateTaskUseCase = new UpdateTaskUseCase(tasksRepository);
  });

  it('should be able to Update a Task', async () => {
    const id = '1';
    const status = TaskStatus.DONE;
    const priority = priorityOptions.high;
    const description = 'test description';

    tasksRepository.update.mockImplementationOnce(() =>
      Promise.resolve({ status, priority, description }),
    );

    const result = await updateTaskUseCase.execute(
      id,
      description,
      status,
      priority,
    );

    expect(result.status).toEqual(status);
    expect(result.description).toEqual(description);
    expect(result.priority).toEqual(priority);

    expect(tasksRepository.update).toHaveBeenCalledWith(
      id,
      description,
      status,
      priority,
    );
  });

  it('should not be able to set Task wrong status', async () => {
    const id = '1';
    const status = 'wrong status';
    const priority = priorityOptions.high;
    const description = 'test description';

    const result = updateTaskUseCase.execute(
      id,
      description,
      status as TaskStatus,
      priority,
    );

    expect(() => result).rejects.toBeInstanceOf(AppError);
  });
});
