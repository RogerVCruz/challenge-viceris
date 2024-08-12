import 'reflect-metadata';
import { CreateTaskUseCase } from './CreateTaskUseCase';
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO';
import { priorityOptions, TaskStatus } from '../../entities/Task';
import { AppError } from '../../../../shared/errors/AppError';

let createTaskUseCase: CreateTaskUseCase;

const tasksRepositoryMock = () => ({
  create: jest.fn(),
  listPending: jest.fn(),
  setStatus: jest.fn(),
  delete: jest.fn(),
  listAll: jest.fn(),
  findByID: jest.fn(),
  update: jest.fn(),
});

const tasksRepository = tasksRepositoryMock();

describe('Create Task', () => {
  beforeAll(() => {
    createTaskUseCase = new CreateTaskUseCase(tasksRepository);
  });

  it('should be able to create a Task', async () => {
    const task: ICreateTaskDTO = {
      status: TaskStatus.DONE,
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
      status: TaskStatus.DONE,
      description: 'Description test',
      priority: priorityOptions.medium,
      user_id: '1',
    };

    const result = createTaskUseCase.execute({
      description: user.description,
      priority: 'wrong priority' as unknown as priorityOptions,
      status: TaskStatus.DONE,
      user_id: user.user_id,
    });

    expect(result).rejects.toBeInstanceOf(AppError);
    expect(result).rejects.toEqual(
      new AppError('Invalid priority option! Choose: high, medium, low'),
    );
  });
});
