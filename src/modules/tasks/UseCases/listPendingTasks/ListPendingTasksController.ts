import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPendingTasksUseCase } from './ListPendingTasksUseCase';

class ListPendingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listPendingTasksUseCase = container.resolve(ListPendingTasksUseCase);

    const tasks = await listPendingTasksUseCase.execute(user_id);

    return response.send(tasks).status(200);
  }
}

export { ListPendingController };
