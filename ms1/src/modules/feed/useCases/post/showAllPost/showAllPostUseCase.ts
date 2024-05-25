import { inject, injectable } from 'tsyringe';

import { IPostRepository } from '../../../repos/IPostRepo';
import { ShowAllPostDTO, ResponseDTO } from './showAllPostDTO';
import { IUseCase } from '../../../../../shared/domain/useCase';

@injectable()
class ShowAllPostUseCase implements IUseCase<ShowAllPostDTO, ResponseDTO> {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({ page, userID }: ShowAllPostDTO): Promise<ResponseDTO> {
    const { result, total } = await this.postRepository.getAllPost({
      skip: Number(page),
      userID,
    });

    return {
      posts: result,
      count: total,
    };
  }
}

export default ShowAllPostUseCase;
