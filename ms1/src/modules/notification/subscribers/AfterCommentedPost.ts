import { container } from 'tsyringe';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { IHandle } from '../../../shared/domain/events/IHandle';
import { PostCommented } from '../domain/events/postCommented';
import { CommentText } from '../../feed/domain/commentText';
import { RabbitMQHandler } from '../../../shared/infra/rabbitmq/RabbitMQHandler';

export class AfterCommentedPost implements IHandle {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(
      // @ts-ignore
      this.onPostCommentedEvent.bind(this),
      PostCommented.name,
    );
  }

  private craftMessage(comment: CommentText): string {
    return comment.value.toString() || `someone commented your post!`;
  }

  // This is called when the domain event is dispatched.
  private async onPostCommentedEvent(event: PostCommented): Promise<void> {
    const rabbitMQHandler = container.resolve(RabbitMQHandler);
    console.log('[AfterCommentedPostEvent]: Executed');

    await rabbitMQHandler.publishToQueue('notificationRegistrations', {
      title: 'Someone commented your post',
      body: this.craftMessage(event.comment.text),
      data: {},
      type: 'notification_commented_post',
      link: event.comment.postId.id.toString(),
      user_id: event.comment.userId.id.toString(),
    });
  }
}
