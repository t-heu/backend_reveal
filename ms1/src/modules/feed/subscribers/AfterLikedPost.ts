import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { IHandle } from '../../../shared/domain/events/IHandle';
import { PostLiked } from '../domain/events/postLiked';

import { serviceNoti } from '../infra/rabbitmq';

export class AfterLikedPost implements IHandle {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(
      // @ts-ignore
      this.onPostLikedEvent.bind(this),
      PostLiked.name,
    );
  }

  private craftMessage(): string {
    return `someone liked your post!`;
  }

  // This is called when the domain event is dispatched.
  private async onPostLikedEvent(event: PostLiked): Promise<void> {
    console.log('[AfterLikedPost]: Executed');

    await serviceNoti(
      {
        title: 'Liked on your post',
        body: this.craftMessage(),
        data: {},
        type: 'notification_liked_post',
        link: event.like.postId.id.toString(),
        user_id: event.like.userId.id.toString(),
      },
      'notificationRegistrations',
    );
  }
}
