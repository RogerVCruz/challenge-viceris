import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';
import { priorityOptions, TaskStatus } from '../../entities/Task';

class UpdateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const status: TaskStatus = request.body.status.toLowerCase();
    const priority: priorityOptions = request.body.priority.toLowerCase();
    const { description } = request.body;

    const updatedTaskUseCase = container.resolve(UpdateTaskUseCase);

    const updatedTask = await updatedTaskUseCase.execute(
      id,
      description,
      status,
      priority,
    );

    return response.send(updatedTask).status(200);
  }
}

export { UpdateTaskController };
