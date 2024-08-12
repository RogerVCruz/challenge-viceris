import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SetStatusUseCase } from './UpdateTaskUseCase';
import { priorityOptions, TaskStatus } from '../../entities/Task';

class SetStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const status: TaskStatus = request.body.status.toLowerCase();
    const priority: priorityOptions = request.body.priority.toLowerCase();
    const { description } = request.body;

    const setStatusUseCase = container.resolve(SetStatusUseCase);

    const updatedTask = await setStatusUseCase.execute(
      id,
      description,
      status,
      priority,
    );

    return response.send(updatedTask).status(200);
  }
}

export { SetStatusController };
