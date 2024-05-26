import { UniqueEntityID } from '../../../shared/domain/uniqueEntityID';
import { AggregateRoot } from '../../../shared/domain/aggregateRoot';
import { UserId } from '../../users/domain/userId';
import { PostId } from './postId';
import { CommentText } from './commentText';
import { CommentId } from './commentId';
import { UserPhoto } from '../../users/domain/userPhoto';

import { DomainEvents } from '../../../shared/domain/events/domainEvents';
import { PostCommentedEvent } from './events/postCommentedEvent';

interface CommentProps {
  text: CommentText;
  postId: PostId;
  userId: UserId;
  dateTimePosted?: Date;
  photo?: string;
  avatarUrl?: string;
  owner_post: UserId;
}
export class Comment extends AggregateRoot<CommentProps> {
  get commentId(): CommentId {
    return CommentId.create(this._id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get dateTimePosted(): Date {
    return this.props.dateTimePosted || new Date();
  }

  get avatarUrl(): string {
    return UserPhoto.create(this.props.photo).getUrl;
  }

  get postId(): PostId {
    return this.props.postId;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get text(): CommentText {
    return this.props.text;
  }

  private constructor(props: CommentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CommentProps, id?: UniqueEntityID): Comment {
    const comment = new Comment({ ...props }, id);
    if (!id && props.owner_post.id.toString() !== props.userId.id.toString()) {
      comment.addDomainEvent(new PostCommentedEvent(comment));
    }
    return comment;
  }
}
