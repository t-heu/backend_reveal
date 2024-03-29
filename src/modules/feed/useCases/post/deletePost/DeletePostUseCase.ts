import { inject, injectable } from 'tsyringe';

import { IPostRepository } from '../../../repos/IPostRepo';
import { DeletePostDTO } from './DeletePostDTO';
import { IUseCase } from '../../../../../shared/domain/UseCase';

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
