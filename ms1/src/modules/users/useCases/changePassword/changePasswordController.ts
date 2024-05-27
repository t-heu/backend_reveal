import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ChangePasswordUseCase from '@/modules/users/useCases/changePassword/changePasswordUseCase';
import { BaseController } from '@/shared/infra/baseController';

export class ChangePasswordController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const userID = req.user.id;
      const { newPassword, oldPassword } = req.body;
  
      const user = container.resolve(ChangePasswordUseCase);
      await user.execute({
        id: userID,
        newPassword,
        oldPassword,
      });
  
      return this.created(res);
    } catch (err: any) {
      return this.conflict(res, err.messsage)
    }
  }
}
