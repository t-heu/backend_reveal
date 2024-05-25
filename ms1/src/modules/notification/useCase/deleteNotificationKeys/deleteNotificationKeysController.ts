import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BaseController } from '../../../../shared/infra/baseController';
import DeleteNotificationKeysUseCase from './deleteNotificationKeysUseCase';

export class DeleteNotificationKeysController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const { key } = req.body;
    const userID = req.user.id;

    const deleteKey = container.resolve(DeleteNotificationKeysUseCase);
    await deleteKey.execute({
      user_id: userID,
      key,
    });

    return this.created(res);
  }
}
