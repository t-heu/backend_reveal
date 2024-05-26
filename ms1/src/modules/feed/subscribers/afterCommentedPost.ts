import { container } from 'tsyringe';
import { DomainEvents } from '../../../shared/domain/events/domainEvents';
import { IHandle } from '../../../shared/domain/events/IHandle';
import { PostCommentedEvent } from '../domain/events/postCommentedEvent';
import { CommentText } from '../../feed/domain/commentText';
import { RabbitMQHandler } from '../../../shared/infra/rabbitmq/rabbitMQHandler';
import { CreateNotificationUseCase } from '../../notification/useCase/createNotification';

export class AfterCommentedPost implements IHandle {
  private rabbitMQHandler: RabbitMQHandler;
  private createNotification: CreateNotificationUseCase;

  constructor() {
    this.setupSubscriptions();
    this.rabbitMQHandler = container.resolve(RabbitMQHandler);
    this.createNotification = container.resolve(CreateNotificationUseCase);
  }

  setupSubscriptions(): void {
    console.log('aq')
    // Register to the domain event
    DomainEvents.register(
      // @ts-ignore
      this.onPostCommentedEvent.bind(this),
      PostCommentedEvent.name,
    );
  }

  private craftMessage(comment: CommentText): string {
    return comment.value.toString() || `Someone commented your post!`;
  }

  // This is called when the domain event is dispatched.
  private async onPostCommentedEvent(event: PostCommentedEvent): Promise<void> {
    console.log('[AfterCommentedPostEvent]: Executed');
    const { comment } = event;

    const token = await this.createNotification.execute({
      title: 'Someone commented your post',
      description: this.craftMessage(comment.text),
      type: 'comment',
      postID: comment.postId.id.toString(),
    })

    await this.rabbitMQHandler.publishToQueue('notificationRegistrations', {
      title: 'Someone commented your post',
      body: this.craftMessage(comment.text),
      token_mobile: token,
      type: 'notification_commented_post',
    });
  }
}
