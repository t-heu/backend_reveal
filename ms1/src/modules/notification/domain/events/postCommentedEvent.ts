import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvent';
import { UniqueEntityID } from '../../../../shared/domain/uniqueEntityID';
import { Comment } from '../../../feed/domain/comment';
// import { Notification } from '../notification';

export class PostCommentedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;

  public comment: Comment;

  constructor(comment: Comment) {
    this.dateTimeOccurred = new Date();
    this.comment = comment;
  }

  getAggregateId(): UniqueEntityID {
    return this.comment.id;
  }
}
