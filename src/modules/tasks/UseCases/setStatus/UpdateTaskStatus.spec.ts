import 'reflect-metadata';
import { TaskStatus } from '../../entities/Task';
import { AppError } from '../../../../shared/errors/AppError';
import { SetStatusUseCase } from './UpdateTaskUseCase';

let setStatusUseCase: SetStatusUseCase;

const tasksRepositoryMock = () => ({
  create: jest.fn(),
  listPending: jest.fn(),
  setStatus: jest.fn(),
  delete: jest.fn(),
  listAll: jest.fn(),
  findByID: jest.fn(),
});

const tasksRepository = tasksRepositoryMock();

describe('Set Task Status', () => {
  beforeAll(() => {
    setStatusUseCase = new SetStatusUseCase(tasksRepository);
  });

  it('should be able to set Task status', async () => {
    const id = '1';
    const status = TaskStatus.DONE;

    tasksRepository.setStatus.mockImplementationOnce(() =>
      Promise.resolve({ status }),
    );

    const result = await setStatusUseCase.execute(id, status);

    expect(result.status).toEqual(status);
    expect(tasksRepository.setStatus).toHaveBeenCalledWith(id, status);
  });

  it('should not be able to set Task wrong status', async () => {
    const id = '1';
    const status = 'wrong status';

    const result = setStatusUseCase.execute(id, status as TaskStatus);

    expect(() => result).rejects.toBeInstanceOf(AppError);
  });
});
