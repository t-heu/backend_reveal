import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BaseController } from '../../../../shared/infra/BaseController';
import CreateNotificationKeysUseCase from './CreateNotificationKeysUseCase';

export class CreateNotificationKeysController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const { key } = req.body;
    const userID = req.user.id;

    const addKey = container.resolve(CreateNotificationKeysUseCase);
    await addKey.execute({
      user_id: userID,
      key,
    });

    return this.created(res);
  }
}
