import { container } from 'tsyringe';
import { DomainEvents } from '../../../shared/domain/events/domainEvents';
import { IHandle } from '../../../shared/domain/events/IHandle';
import { PostLikedEvent } from '../domain/events/postLikedEvent';
import { CreateNotificationUseCase } from '../../notification/useCase/createNotification';
import { RabbitMQHandler } from '../../../shared/infra/rabbitmq/rabbitMQHandler';

export class AfterLikedPost implements IHandle {
  private rabbitMQHandler: RabbitMQHandler;
  private createNotification: CreateNotificationUseCase;

  constructor() {
    this.setupSubscriptions();
    this.rabbitMQHandler = container.resolve(RabbitMQHandler);
    this.createNotification = container.resolve(CreateNotificationUseCase);
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
    console.log('[AfterLikedPost]: Executed');
    const { like } = event;

    const token = await this.createNotification.execute({
      title: 'Someone commented your post',
      description: this.craftMessage(),
      type: 'like',
      postID: like.postId.id.toString(),
    })

    await this.rabbitMQHandler.publishToQueue('notificationRegistrations', {
      title: 'Liked on your post',
      body: this.craftMessage(),
      type: 'notification_liked_post',
      token_mobile: token,
    });
  }
}
