import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SetStatusUseCase } from './SetStatusUseCase';
import { TaskStatus } from '../../entities/Task';

class SetStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const status: TaskStatus = request.body.status.toLowerCase();

    const setStatusUseCase = container.resolve(SetStatusUseCase);

    const updatedTask = await setStatusUseCase.execute(id, status);

    return response.send(updatedTask).status(200);
  }
}

export { SetStatusController };
