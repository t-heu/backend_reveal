import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordEmailUseCase from './ForgotPasswordEmailUseCase';
import { BaseController } from '../../../../shared/infra/BaseController';

export class ForgotPasswordEmailController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.body;

      const user = container.resolve(ForgotPasswordEmailUseCase);
      await user.execute({ email });

      return this.created(res);
    } catch (err: any) {
      return this.conflict(res, err.message);
    }
  }
}
