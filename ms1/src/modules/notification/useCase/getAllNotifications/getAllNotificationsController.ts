import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BaseController } from '@/shared/infra/baseController';
import GetAllNotificationsUseCase from './getAllNotificationsUseCase';

export class GetAllNotificationsController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const { page = 0 } = req.query;
    const userID = req.user.id;

    const posts = container.resolve(GetAllNotificationsUseCase);
    const result = await posts.execute({
      skip: Number(page),
      userID,
    });

    res.header('X-Total-Count', String(result.count));
    return this.ok(
      res,
      result,
    );
  }
}
