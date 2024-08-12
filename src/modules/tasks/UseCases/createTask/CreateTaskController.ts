import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTaskUseCase } from './CreateTaskUseCase';

class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    let { description, priority, status } = request.body;

    const user_id = request.user.id;

    priority = priority.toLowerCase();
    status = status.toLowerCase();

    const createTaskUseCase = container.resolve(CreateTaskUseCase);

    const task = await createTaskUseCase.execute({
      description,
      priority,
      status,
      user_id,
    });

    return response.send(task).status(201);
  }
}

export { CreateTaskController };
