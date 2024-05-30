import { inject, injectable } from 'tsyringe';

import { IPostRepository } from '@/modules/feed/domain/repos/IPostRepo';
import { ShowAllLikesPostsDTO, ResponseDTO } from '@/modules/feed/useCases/post/showAllLikesPosts/showAllLikesPostsDTO';
import { IUseCase } from '@/shared/domain/useCase';

@injectable()
class ShowAllLikesPostsUseCase
  implements IUseCase<ShowAllLikesPostsDTO, ResponseDTO> {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({
    skip,
    userID,
  }: ShowAllLikesPostsDTO): Promise<ResponseDTO> {
    const { result, total } = await this.postRepository.getAllPostLiked({
      skip,
      userID,
    });

    return {
      posts: result,
      count: total,
    };
  }
}

export default ShowAllLikesPostsUseCase;
