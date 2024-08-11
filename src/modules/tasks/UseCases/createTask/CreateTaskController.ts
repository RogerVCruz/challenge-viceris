import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTaskUseCase } from './CreateTaskUseCase';


class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    let { description, priority } = request.body;

    const user_id = request.user.id;

    priority = priority.toLowerCase()

    const createTaskUseCase = container.resolve(CreateTaskUseCase);

    await createTaskUseCase.execute({
      description,
      priority,
      user_id,
    });

    return response.sendStatus(201);
  }
}

export { CreateTaskController };
