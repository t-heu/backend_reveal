import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetAllCommentsUseCase from './getAllCommentsUseCase';
import { BaseController } from '@/shared/infra/baseController';
import CommentMap from '../../../mappers/commentMap';

export class GetAllCommentsController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { page = 1 } = req.query;
      const postID = req.params.id;
  
      const comment = container.resolve(GetAllCommentsUseCase);
      const result = await comment.execute({
        page: Number(page),
        postID,
      });
  
      res.header('X-Total-Count', String(result.count));
      return this.ok(
        res,
        result.comments.map(p => CommentMap.toDTO(p)),
      );
    } catch(err: any) {
      return this.conflict(res, err.message);
    }
  }
}
