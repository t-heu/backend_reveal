import { inject, injectable } from 'tsyringe';

import { IPostRepository } from '../../../repos/IPostRepo';
import { userId } from '../../../../users/domain/userId';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { CreatePostDTO } from './createPostDTO';
import { IUseCase } from '@/shared/domain/useCase';
import { Post } from '../../../domain/post';
import { PostText } from '../../../domain/postText';

@injectable()
class CreatePostUseCase implements IUseCase<CreatePostDTO, void> {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({ description, userID }: CreatePostDTO): Promise<void> {
    const text = PostText.create({ value: description });
    const user_id = userId.create(new UniqueEntityID(userID));

    const post = Post.create({ text, userID: user_id });

    await this.postRepository.create(post);
  }
}

export default CreatePostUseCase;
