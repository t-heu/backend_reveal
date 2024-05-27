import { inject, injectable } from 'tsyringe';

import { IPostRepository } from '@/modules/feed/repos/IPostRepo';
import { SearchPostDTO, ResponseDTO } from '@/modules/feed/useCases/post/searchPost/searchPostDTO';
import { IUseCase } from '@/shared/domain/useCase';

@injectable()
class SearchPostUseCase implements IUseCase<SearchPostDTO, ResponseDTO> {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({
    search,
    userID,
    page,
  }: SearchPostDTO): Promise<ResponseDTO> {
    const { result, total } = await this.postRepository.getAllPostSearch({
      search,
      skip: page,
      userID,
    });

    return {
      posts: result,
      count: total,
    };
  }
}

export default SearchPostUseCase;
