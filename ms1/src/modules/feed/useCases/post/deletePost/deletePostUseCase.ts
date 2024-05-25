import { inject, injectable } from 'tsyringe';

import { IPostRepository } from '../../../repos/IPostRepo';
import { DeletePostDTO } from './deletePostDTO';
import { IUseCase } from '../../../../../shared/domain/useCase';

@injectable()
class DeletePostUseCase implements IUseCase<DeletePostDTO, void> {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({ idPost }: DeletePostDTO): Promise<void> {
    if (!(await this.postRepository.exists(idPost))) {
      throw new Error('post not exists');
    }
    
    await this.postRepository.delete(idPost);
  }
}

export default DeletePostUseCase;
