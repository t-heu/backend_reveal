import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchPostUseCase from './searchPostUseCase';
import { BaseController } from '@/shared/infra/baseController';
import PostMap from '../../../mappers/postMap';

export class SearchPostController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { q, page = 1 } = req.query;
      const userID = req.user.id;

      const post = container.resolve(SearchPostUseCase);
      const result = await post.execute({
        userID,
        page: Number(page),
        search: q as string,
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
