import { inject, injectable } from 'tsyringe';

import { HidePost } from '@/modules/feed/domain/hidePost';
import { postId } from '@/modules/feed/domain/postId';
import { userId } from '@/modules/users/domain/userId';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { IHidePostRepository } from '@/modules/feed/repos/IHidePostRepo';
import { SwitchHidePostDTO } from '@/modules/feed/useCases/post/switchHidePost/switchHidePostDTO';
import { IUseCase } from '@/shared/domain/useCase';

@injectable()
class SwitchHidePostUseCase implements IUseCase<SwitchHidePostDTO, void> {
  constructor(
    @inject('HidePostRepository')
    private hidePostRepository: IHidePostRepository,
  ) {}

  public async execute({ postID, userID }: SwitchHidePostDTO): Promise<void> {
    const post_id = postId.create(new UniqueEntityID(postID));
    const user_id = userId.create(new UniqueEntityID(userID));
    const hidePost = HidePost.create({ userID: user_id, postID: post_id });

    if (await this.hidePostRepository.exists(hidePost)) {
      await this.hidePostRepository.removeBlock(hidePost);
    } else {
      await this.hidePostRepository.addBlock(hidePost);
    }
  }
}

export default SwitchHidePostUseCase;
