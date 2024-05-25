import { UniqueEntityID } from '../../../shared/domain/uniqueEntityID';
import { AggregateRoot } from '../../../shared/domain/aggregateRoot';
import { DomainEvents } from '../../../shared/domain/events/domainEvents';
import { UserId } from '../../users/domain/userId';
import { NotiId } from './notiId';
import { PostLikedEvent } from './events/postLikedEvent';
import { PostCommentedEvent } from './events/postCommentedEvent';

import { Like } from '../../feed/domain/like';
import { Comment } from '../../feed/domain/comment';

interface NotificationProps {
  userId: UserId;
  type: 'comment' | 'like';
  title: string;
  description: string;
  link: string;
  dateTimePosted?: string | Date;
  read?: boolean;
  eventData?: Like | Comment;
}

export class Notification extends AggregateRoot<NotificationProps> {
  get notificationId(): NotiId {
    return NotiId.create(this._id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get dateTimePosted(): string | Date {
    return this.props.dateTimePosted || new Date();
  }

  get description(): string {
    return this.props.description;
  }

  get read(): boolean {
    return this.props.read || false;
  }

  get title(): string {
    return this.props.title;
  }

  get link(): string {
    return this.props.link ? this.props.link : '#';
  }

  get type(): string {
    return this.props.type;
  }

  get eventData(): Like | Comment | undefined {
    return this.props.eventData || undefined;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  private constructor(props: NotificationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: NotificationProps,
    id?: UniqueEntityID,
  ): Notification {
    const notification = new Notification({ ...props }, id);

    if (!id) notification.dispatchDomainEvents();
    return notification;
  }

  private dispatchDomainEvents(): void {
    if (this.props.type === 'comment') {
      this.addDomainEvent(
        new PostCommentedEvent(this.props.eventData as Comment)
      );
    } else if (this.props.type === 'like') {
      this.addDomainEvent(new PostLikedEvent(this.props.eventData as Like));
    }
    DomainEvents.dispatchEventsForAggregate(this.id);
  }
}
