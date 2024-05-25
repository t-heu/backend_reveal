import { inject, injectable } from 'tsyringe';

import { IPostRepository } from '../../../repos/IPostRepo';
import { GetAllHidesPostDTO, ResponseDTO } from './getAllHidesPostDTO';
import { IUseCase } from '../../../../../shared/domain/useCase';

@injectable()
class GetAllHidesPostUseCase
  implements IUseCase<GetAllHidesPostDTO, ResponseDTO> {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({
    skip,
    userID,
  }: GetAllHidesPostDTO): Promise<ResponseDTO> {
    const { result, total } = await this.postRepository.getAllPostsHide({
      skip,
      userID,
    });

    return {
      posts: result,
      count: total,
    };
  }
}

export default GetAllHidesPostUseCase;
