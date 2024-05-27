import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCommentUseCase from '@/modules/feed/useCases/comments/createComment/createCommentUseCase';
import { BaseController } from '@/shared/infra/baseController';

export class CreateCommentController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const { answer } = req.body;
      const postID = req.params.id;
      const userID = req.user.id;
      
      const response = container.resolve(CreateCommentUseCase);
      await response.execute({ answer, userID, postID });
  
      return this.created(res);
    } catch (err: any) {
      return this.conflict(res, err.message);
    }
  }
}
