import { Request, Response } from 'express';
import { container } from 'tsyringe';

import VerifyEmailUseCase from '@/modules/users/useCases/verifyEmail/verifyEmailUseCase';
import { BaseController } from '@/shared/infra/baseController';

export class VerifyEmailController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { token } = req.query;

      const response = container.resolve(VerifyEmailUseCase);
      await response.execute({ token: token as string });

      return res.send('Confirmed!');
    } catch (err: any) {
      return this.conflict(res, err.message)
    }
  }
}
