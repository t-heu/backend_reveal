import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserMap from '@/modules/users/mappers/userMap';
import { BaseController } from '@/shared/infra/baseController';
import RegisterWithGoogleUseCase from '@/modules/users/useCases/registerWithGoogle/registerWithGoogleUseCase';

export class RegisterWithGoogleController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { accessTokenGoogle } = req.body;

      const user = container.resolve(RegisterWithGoogleUseCase);
      const result = await user.execute({
        accessTokenGoogle,
      });

      return this.ok(res, {
        user: UserMap.toDTO(result.user),
        accessToken: result.accessToken,
      });
    } catch (err: any) {
      return this.conflict(res, err.message)
    }
  }
}
