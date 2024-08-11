import 'reflect-metadata';
import { CreateTaskUseCase } from './CreateTaskUseCase';
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO';
import { priorityOptions } from '../../entities/Task';
import { AppError } from '../../../../shared/errors/AppError';

let createTaskUseCase: CreateTaskUseCase;

const tasksRepositoryMock = () => ({
  create: jest.fn(),
  listPending: jest.fn(),
  setStatus: jest.fn(),
  delete: jest.fn(),
  listAll: jest.fn(),
  findByID: jest.fn(),
});

const tasksRepository = tasksRepositoryMock();

describe('Create Task', () => {
  beforeAll(() => {
    createTaskUseCase = new CreateTaskUseCase(tasksRepository);
  });

  it('should be able to create a Task', async () => {
    const task: ICreateTaskDTO = {
      description: 'Description test',
      priority: priorityOptions.medium,
      user_id: '1',
    };

    const result = await createTaskUseCase.execute(task);

    expect(() => result).not.toThrow(Error);
    expect(tasksRepository.create).toHaveBeenCalledWith(task);
  });

  it('should not be able to create a Task', async () => {
    const user: ICreateTaskDTO = {
      description: 'Description test',
      priority: priorityOptions.medium,
      user_id: '1',
    };

    const result = createTaskUseCase.execute({
      description: user.description,
      user_id: user.user_id,
      priority: 'wrong priority' as unknown as priorityOptions,
    });

    expect(result).rejects.toBeInstanceOf(AppError);
    expect(result).rejects.toEqual(
      new AppError('Invalid priority option! Choose: high, medium, low'),
    );
  });
});
