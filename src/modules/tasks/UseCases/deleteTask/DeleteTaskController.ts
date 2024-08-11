import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';

class DeleteTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const user_id = request.user.id;

    const deleteUserUseCase = container.resolve(DeleteTaskUseCase);

    await deleteUserUseCase.execute(id, user_id);
    return response.sendStatus(200);
  }
}

export { DeleteTaskController };
