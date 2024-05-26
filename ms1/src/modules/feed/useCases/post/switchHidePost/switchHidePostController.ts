import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SwitchHidePostUseCase from './switchHidePostUseCase';
import { BaseController } from '@/shared/infra/baseController';

export class SwitchHidePostController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const postID = req.params.id;
      const userID = req.user.id;

      const hide = container.resolve(SwitchHidePostUseCase);
      await hide.execute({ postID, userID });

      return this.created(res);
    } catch (err: any) {
      return this.conflict(res, err.message);
    }
  }
}
