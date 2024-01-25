import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserUseCase from './CreateUserUseCase';
import { BaseController } from '../../../../shared/infra/BaseController';

export class CreateUserController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const { email, password, name } = req.body;

    const response = container.resolve(CreateUserUseCase);
    const status_erro = await response.execute({ email, password, name });
    
    if (status_erro) return this.conflict(res, status_erro)

    return this.created(res);
  }
}
