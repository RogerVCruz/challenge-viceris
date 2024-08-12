import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { TaskStatus } from '../../entities/Task';
import { ListTasksUseCase } from './ListTasksUseCase';

class ListTasksController {
  async handle(request: Request, response: Response): Promise<Response> {
    let status = request.query.status;

    if (!status || typeof status !== 'string') {
      status = TaskStatus.EMPTY;
    }
    status = status.toLowerCase();

    const user_id = request.user.id;

    const listAllTasksUseCase = container.resolve(ListTasksUseCase);

    const tasks = await listAllTasksUseCase.execute(
      user_id,
      status as TaskStatus,
    );

    return response.send(tasks).status(200);
  }
}

export { ListTasksController };
