import { inject, injectable, delay } from 'tsyringe';

import { ICommentRepository } from '../../../repos/ICommentRepo';
import { IPostRepository } from '../../../repos/IPostRepo';
import { AddCommentDTO } from './createCommentDTO';
import { IUseCase } from '../../../../../shared/domain/useCase';
import { CommentText } from '../../../domain/commentText';
import { Comment } from '../../../domain/comment';
import { PostId } from '../../../domain/postId';
import { UserId } from '../../../../users/domain/userId';
import { UniqueEntityID } from '../../../../../shared/domain/uniqueEntityID';
import { INotificationRepository } from '../../../../notification/repos/INotification';
import { Notification } from '../../../../notification/domain/notification';

@injectable()
class CreateCommentUseCase implements IUseCase<AddCommentDTO, void> {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
    @inject('PostRepository')
    private postRepository: IPostRepository,
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  public async execute({
    postID,
    userID,
    answer,
  }: AddCommentDTO): Promise<void> {
    const text = CommentText.create({ value: answer });

    const post = await this.postRepository.getPostById(postID);

    const comment = Comment.create({
      owner_post: UserId.create(new UniqueEntityID(post.userId.id.toString())),
      text,
      userId: UserId.create(new UniqueEntityID(userID)),
      postId: PostId.create(new UniqueEntityID(postID)),
    });

    await this.commentRepository.create(comment);

    const notification = Notification.create({
      type: 'comment',
      title: `Your post was commented on`,
      description: `User ${userID} commented on your post.`,
      link: `/posts/${postID}`,
      userId: post.userId,
      eventData: comment,
    });

    console.log('Notification ID:', notification.id.toValue());

    await this.notificationRepository.createNotification(notification);
  }
}

export default CreateCommentUseCase;
