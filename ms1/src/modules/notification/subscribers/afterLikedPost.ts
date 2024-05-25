import { container } from 'tsyringe';
import { DomainEvents } from '../../../shared/domain/events/domainEvents';
import { IHandle } from '../../../shared/domain/events/IHandle';
import { PostLikedEvent } from '../domain/events/postLikedEvent';

import { RabbitMQHandler } from '../../../shared/infra/rabbitmq/rabbitMQHandler';

export class AfterLikedPost implements IHandle {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(
      // @ts-ignore
      this.onPostLikedEvent.bind(this),
      PostLikedEvent.name,
    );
  }

  private craftMessage(): string {
    return `someone liked your post!`;
  }

  // This is called when the domain event is dispatched.
  private async onPostLikedEvent(event: PostLikedEvent): Promise<void> {
    const rabbitMQHandler = container.resolve(RabbitMQHandler);
    console.log('[AfterLikedPost]: Executed');

    await rabbitMQHandler.publishToQueue('notificationRegistrations', {
      title: 'Liked on your post',
      body: this.craftMessage(),
      data: {},
      type: 'notification_liked_post',
      link: event.like.postId.id.toString(),
      user_id: event.like.userId.id.toString(),
    });
  }
}
