import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BaseController } from '../../../../../shared/infra/BaseController';
import DeletePostUseCase from './DeletePostUseCase';

export class DeletePostController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const post = container.resolve(DeletePostUseCase);
    const status_erro = await post.execute({ idPost: id });

    if (status_erro) return this.conflict(res, status_erro);

    return this.created(res);
  }
}
