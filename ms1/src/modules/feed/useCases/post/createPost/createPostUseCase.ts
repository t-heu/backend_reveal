import { inject, injectable } from 'tsyringe';

import { IPostRepository } from '@/modules/feed/repos/IPostRepo';
import { userId } from '@/modules/users/domain/userId';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { CreatePostDTO } from '@/modules/feed/useCases/post/createPost/createPostDTO';
import { IUseCase } from '@/shared/domain/useCase';
import { Post } from '@/modules/feed/domain/post';
import { PostText } from '@/modules/feed/domain/postText';

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
