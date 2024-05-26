import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { AggregateRoot } from '@/shared/domain/aggregateRoot';
import { userId } from '../../users/domain/userId';
import { NotiId } from './notiId';

interface NotificationProps {
  userID: userId;
  type: 'comment' | 'like';
  title: string;
  description: string;
  link: string;
  dateTimePosted?: string | Date;
  read?: boolean;
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

  get userID(): userId {
    return this.props.userID;
  }

  private constructor(props: NotificationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: NotificationProps,
    id?: UniqueEntityID,
  ): Notification {
    const notification = new Notification({ ...props }, id);
    return notification;
  }
}
