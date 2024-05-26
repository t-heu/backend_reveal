import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarUseCase from './updateUserAvatarUseCase';
import { BaseController } from '@/shared/infra/baseController';

export class UpdateUserAvatarController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const userID = req.user.id;

      const user = container.resolve(UpdateUserAvatarUseCase);
      if (req.file) {
        await user.execute({
          id: userID,
          photo: req.file.filename,
        });
      }

      return this.created(res);
    } catch (err: any) {
      return this.fail(res, err.message);
    }
  }
}
