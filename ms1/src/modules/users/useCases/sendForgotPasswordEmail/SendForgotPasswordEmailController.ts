import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailUseCase from './SendForgotPasswordEmailUseCase';
import { BaseController } from '../../../../shared/infra/BaseController';

export class SendForgotPasswordEmailController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.body;

      const user = container.resolve(SendForgotPasswordEmailUseCase);
      await user.execute({ email });

      return this.created(res);
    } catch (err: any) {
      return this.conflict(res, err.message);
    }
  }
}
