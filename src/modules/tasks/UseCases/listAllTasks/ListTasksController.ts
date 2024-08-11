import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { TaskStatus } from '../../entities/Task';
import { ListTasksUseCase } from './ListTasksUseCase';

class ListTasksController {
  async handle(request: Request, response: Response): Promise<Response> {
    let { status } = request.query;

    if (!status) {
      status = TaskStatus.EMPTY;
    }

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
