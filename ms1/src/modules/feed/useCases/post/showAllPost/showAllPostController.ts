import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowAllPostUseCase from '@/modules/feed/useCases/post/showAllPost/showAllPostUseCase';
import { BaseController } from '@/shared/infra/baseController';
import PostMap from '@/modules/feed/mappers/postMap';

export class ShowAllPostController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { page = 1 } = req.query;
      const userID = req.user.id;

      const post = container.resolve(ShowAllPostUseCase);
      const result = await post.execute({
        page: Number(page),
        userID,
      });

      res.header('X-Total-Count', String(result.count));
      return this.ok(
        res,
        result.posts.map(p => PostMap.toDTO(p)),
      );
    } catch (err: any) {
      return this.conflict(res, err.message);
    }
  }
}
