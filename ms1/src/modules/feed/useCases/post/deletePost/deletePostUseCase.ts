import { inject, injectable } from 'tsyringe';

import { IPostRepository } from '@/modules/feed/domain/repos/IPostRepo';
import { DeletePostDTO } from '@/modules/feed/useCases/post/deletePost/deletePostDTO';
import { IUseCase } from '@/shared/domain/useCase';

@injectable()
class DeletePostUseCase implements IUseCase<DeletePostDTO, void> {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({ postID }: DeletePostDTO): Promise<void> {
    if (!(await this.postRepository.exists(postID))) {
      throw new Error('post not exists');
    }
    
    await this.postRepository.delete(postID);
  }
}

export default DeletePostUseCase;
