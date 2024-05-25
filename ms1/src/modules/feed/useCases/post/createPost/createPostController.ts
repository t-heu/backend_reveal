import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BaseController } from '../../../../../shared/infra/baseController';
import CreatePostUseCase from './createPostUseCase';

export class CreatePostController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { description } = req.body;
      const userID = req.user.id;

      const post = container.resolve(CreatePostUseCase);
      await post.execute({ description, userID });

      return this.created(res);
    } catch (err: any) {
      return this.conflict(res, err.message);
    }
  }
}
