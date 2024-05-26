import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BaseController } from '../../../../shared/infra/baseController';
import CreatePushNotificationTokensUseCase from './createPushTokenUseCase';

export class CreatePushTokenController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const { key } = req.body;
    const userID = req.user.id;

    const addKey = container.resolve(CreatePushNotificationTokensUseCase);
    await addKey.execute({
      user_id: userID,
      key,
    });

    return this.created(res);
  }
}
