import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SwitchLikePostUseCase from './switchLikePostUseCase';
import { BaseController } from '@/shared/infra/baseController';

export class SwitchLikePostController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const postID = req.params.id;
      const userID = req.user.id;

      const like = container.resolve(SwitchLikePostUseCase);
      await like.execute({ postID, userID });

      return this.created(res);
    } catch (err: any) {
      return this.conflict(res, err.message);
    }
  }
}
