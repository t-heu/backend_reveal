import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserMap from '../../mappers/userMap';
import { BaseController } from '@/shared/infra/baseController';
import GetCurrentUserUserUseCase from './getCurrentUserUseCase';

export class GetCurrentUserUserController extends BaseController {
  constructor() {
    super();
  }

  public async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const userID = req.user.id;

      const user = container.resolve(GetCurrentUserUserUseCase);
      const result = await user.execute({ id: userID });

      if (typeof result === 'string') return this.conflict(res, result);

      return this.ok(res, {
        user: UserMap.toDTO(result),
      });
     } catch (err: any) {
      return this.conflict(res, err.message)
    }
  }
}
