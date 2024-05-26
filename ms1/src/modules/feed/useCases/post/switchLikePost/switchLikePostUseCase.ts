import { inject, injectable } from 'tsyringe';

import { Like } from '../../../domain/like';
import { postId } from '../../../domain/postId';
import { userId } from '../../../../users/domain/userId';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { ILikeRepository } from '../../../repos/ILikeRepo';
import { IPostRepository } from '../../../repos/IPostRepo';
import { SwitchLikePostDTO } from './switchLikePostDTO';

@injectable()
class SwitchLikePostUseCase {
  constructor(
    @inject('LikeRepository')
    private likeRepository: ILikeRepository,
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({ postID, userID }: SwitchLikePostDTO): Promise<void> {
    const post_id = postId.create(new UniqueEntityID(postID));
    const user_id = userId.create(new UniqueEntityID(userID));

    const post = await this.postRepository.getPostById(postID);

    const owner_post = userId.create(new UniqueEntityID(String(post.userID)));

    const like = Like.create({
      userID: user_id,
      postID: post_id,
      owner_post,
    });

    if (await this.likeRepository.exists(like)) {
      await this.likeRepository.removeLike(like);
    } else {
      await this.likeRepository.addLike(like);
    }
  }
}

export default SwitchLikePostUseCase;
