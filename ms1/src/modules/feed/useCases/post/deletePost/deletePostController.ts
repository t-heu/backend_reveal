import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BaseController } from '@/shared/infra/baseController';
import DeletePostUseCase from '@/modules/feed/useCases/post/deletePost/deletePostUseCase';

export class DeletePostController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const post = container.resolve(DeletePostUseCase);
      await post.execute({ postID: id });

      return this.created(res);
    } catch (err: any) {
      return this.conflict(res, err.message);
    }
  }
}
