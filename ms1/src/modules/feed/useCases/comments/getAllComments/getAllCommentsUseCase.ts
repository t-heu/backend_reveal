import { inject, injectable } from 'tsyringe';

import { ICommentRepository } from '@/modules/feed/domain/repos/ICommentRepo';
import { ShowAllCommentsDTO, ResponseDTO } from '@/modules/feed/useCases/comments/getAllComments/getAllCommentsDTO';
import { IUseCase } from '@/shared/domain/useCase';

@injectable()
class ShowAllCommentsUseCase
  implements IUseCase<ShowAllCommentsDTO, ResponseDTO> {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) {}

  public async execute({page,postID,}: ShowAllCommentsDTO): Promise<ResponseDTO> {
    const { result, total } = await this.commentRepository.findAllCount(
      page,
      postID,
    );

    return {
      comments: result,
      count: total,
    };
  }
}

export default ShowAllCommentsUseCase;
