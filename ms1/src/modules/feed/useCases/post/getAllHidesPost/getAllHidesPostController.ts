import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetAllHidesPostUseCase from '@/modules/feed/useCases/post/getAllHidesPost/getAllHidesPostUseCase';
import { BaseController } from '@/shared/infra/baseController';
import PostMap from '@/modules/feed/mappers/postMap';

export class GetAllHidesPostController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { page = 1 } = req.query;
      const userID = req.user.id;

      const posts = container.resolve(GetAllHidesPostUseCase);
      const result = await posts.execute({
        skip: Number(page),
        userID,
      });

      // res.header('X-Total-Count', String(total));
      // return res.json(result);
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
