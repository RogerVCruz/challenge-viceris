import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTaskUseCase } from './CreateTaskUseCase';
import { priorityOptions } from '../../entities/Task';
import { AppError } from '../../../../shared/errors/AppError';

class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description, priority } = request.body;

    const user_id = request.user.id;

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
