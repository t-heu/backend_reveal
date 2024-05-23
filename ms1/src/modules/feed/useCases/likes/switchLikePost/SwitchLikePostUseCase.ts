import { inject, injectable, delay } from 'tsyringe';

import { Like } from '../../../domain/like';
import { PostId } from '../../../domain/postId';
import { UserId } from '../../../../users/domain/userId';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { ILikeRepository } from '../../../repos/ILikeRepo';
import { IPostRepository } from '../../../repos/IPostRepo';
import { SwitchLikePostDTO } from './SwitchLikePostDTO';
import { WebSocketHandler } from '../../../../../shared/infra/ws/WebSocketHandler';
import { INotificationRepository } from '../../../../notification/repos/INotification';
import { Notification } from '../../../../notification/domain/notification';

@injectable()
class SwitchLikePostUseCase {
  constructor(
    @inject('LikeRepository')
    private likeRepository: ILikeRepository,
    @inject('PostRepository')
    private postRepository: IPostRepository,
    // @ts-ignore
    @inject(delay(() => 'NotificationRepository'))
    private notificationRepository: INotificationRepository,
    // @ts-ignore
    @inject(delay(() => 'WebSocketHandler'))
    private webSocketHandler: WebSocketHandler,
  ) {}

  public async execute({ idPost, userID }: SwitchLikePostDTO): Promise<void> {
    const post_id = PostId.create(new UniqueEntityID(idPost));
    const user_id = UserId.create(new UniqueEntityID(userID));

    const post = await this.postRepository.getPostById(idPost);

    const owner_post = UserId.create(new UniqueEntityID(String(post.userId)));

    const like = Like.create({
      userId: user_id,
      postId: post_id,
      owner_post,
    });

    let notificationType: string;
    if (await this.likeRepository.exists(like)) {
      await this.likeRepository.removeLike(like);
      notificationType = 'like_removed';
    } else {
      await this.likeRepository.addLike(like);
      notificationType = 'like_added';
    }

    const notification = Notification.create({
      type: 'like',
      title: `Your post was ${notificationType}`,
      description: `User ${userID} ${
        notificationType === 'like_added' ? 'liked' : 'unliked'
      } your post.`,
      link: `/posts/${idPost}`,
      userId: owner_post,
      eventData: like,
    });

    await this.notificationRepository.createNotification(notification);

    const resultCount =
      await this.notificationRepository.getCountNotificationNotRead(
        String(owner_post.id),
      );

    this.webSocketHandler.sendNotification(String(owner_post.id), {
      count_notification_not_read: resultCount,
    });
  }
}

export default SwitchLikePostUseCase;
