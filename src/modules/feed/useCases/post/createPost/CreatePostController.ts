import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BaseController } from '../../../../../shared/infra/BaseController';
import CreatePostUseCase from './CreatePostUseCase';

export class CreatePostController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const { description } = req.body;
    const userID = req.user.id;

    const post = container.resolve(CreatePostUseCase);
    const status_erro = await post.execute({ description, userID });

    if (status_erro) return this.conflict(res, status_erro);

    return this.created(res);
  }
}
