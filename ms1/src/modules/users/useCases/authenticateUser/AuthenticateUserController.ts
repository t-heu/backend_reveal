import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserMap from '../../mappers/userMap';
import { BaseController } from '../../../../shared/infra/BaseController';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

export class AuthenticateUserController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;

      const user = container.resolve(AuthenticateUserUseCase);
      const result = await user.execute({
        email,
        password,
      });
  
      return this.ok(res, {
        user: UserMap.toDTO(result.user),
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        token_type: result.token_type,
        expires: result.expires,
      });
    } catch (err: any) {
      return this.conflict(res, err.message)
    }
  }
}
