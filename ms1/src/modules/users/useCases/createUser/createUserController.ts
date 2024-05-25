import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserUseCase from './createUserUseCase';
import { BaseController } from '../../../../shared/infra/baseController';

export class CreateUserController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { email, password, name } = req.body;

      const response = container.resolve(CreateUserUseCase);
      await response.execute({ email, password, name });

      return this.created(res);
    } catch (err: any) {
      return this.conflict(res, err.message);
    }
  }
}
