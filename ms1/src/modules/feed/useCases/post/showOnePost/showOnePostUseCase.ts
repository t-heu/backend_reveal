import { inject, injectable } from 'tsyringe';

import { IPostRepository } from '@/modules/feed/repos/IPostRepo';
import { Post } from '@/modules/feed/domain/post';
import { ShowOnePostDTO } from '@/modules/feed/useCases/post/showOnePost/showOnePostDTO';
import { IUseCase } from '@/shared/domain/useCase';
@injectable()
class ShowOnePostUseCase implements IUseCase<ShowOnePostDTO, Post> {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({ id, userID }: ShowOnePostDTO): Promise<Post> {
    const response = await this.postRepository.getPostById(id, userID);
    return response;
  }
}

export default ShowOnePostUseCase;
