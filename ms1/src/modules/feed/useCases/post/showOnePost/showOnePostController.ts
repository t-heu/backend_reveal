import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowOnePostUseCase from '@/modules/feed/useCases/post/showOnePost/showOnePostUseCase';
import { BaseController } from '@/shared/infra/baseController';
import PostMap from '@/modules/feed/mappers/postMap';

export class ShowOnePostController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const userID = req.user.id;

      const post = container.resolve(ShowOnePostUseCase);
      const response = await post.execute({ id, userID });

      return this.ok(res, PostMap.toDTO(response));
    } catch (err: any) {
      return this.conflict(res, err.message);
    }
  }
}
