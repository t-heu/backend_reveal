import { IDomainEvent } from '@/shared/domain/events/IDomainEvent';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { Comment } from '@/modules/feed/domain/comment';
// import { Post } from '../../../feed/domain/post';

export class PostCommentedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public comment: Comment;
  // public post: Post;

  constructor(/*post: Post, */comment: Comment) {
    this.dateTimeOccurred = new Date();
    this.comment = comment;
    // this.post = post;
  }

  getAggregateId(): UniqueEntityID {
    return this.comment.id;
  }
}
