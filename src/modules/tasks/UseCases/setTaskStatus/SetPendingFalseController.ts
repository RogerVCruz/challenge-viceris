import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SetPendingFalseUseCase } from './SetPendingFalseUseCase';

class SetPendingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const pending = request.headers.pending as string;
    let status: boolean;

    if (pending === 'false') {
      status = false;
    } else if (pending === 'true') {
      status = true;
    }

    const setPendingFalseUseCase = container.resolve(SetPendingFalseUseCase);

    const updatedTask = await setPendingFalseUseCase.execute(id, status);

    return response.send(updatedTask).status(200);
  }
}

export { SetPendingController };
