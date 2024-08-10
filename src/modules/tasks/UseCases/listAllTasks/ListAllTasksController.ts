import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllTasksUseCase } from './ListAllTasksUseCase';

class ListAllTasksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listAllTasksUseCase = container.resolve(ListAllTasksUseCase);

    const tasks = await listAllTasksUseCase.execute(user_id);

    return response.send(tasks).status(200);
  }
}

export { ListAllTasksController };
