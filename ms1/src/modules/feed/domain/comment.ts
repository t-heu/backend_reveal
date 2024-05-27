import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { AggregateRoot } from '@/shared/domain/aggregateRoot';
import { userId } from '@/modules/users/domain/userId';
import { postId } from '@/modules/feed/domain/postId';
import { CommentText } from '@/modules/feed/domain//commentText';
import { CommentId } from '@/modules/feed/domain//commentId';
import { UserPhoto } from '@/modules/users/domain/userPhoto';
import { PostCommentedEvent } from '@/modules/feed/domain/events/postCommentedEvent';

interface CommentProps {
  text: CommentText;
  postID: postId;
  userID: userId;
  dateTimePosted?: Date;
  photo?: string;
  avatarUrl?: string;
  owner_post: userId;
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

  get postID(): postId {
    return this.props.postID;
  }

  get userID(): userId {
    return this.props.userID;
  }

  get text(): CommentText {
    return this.props.text;
  }

  private constructor(props: CommentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CommentProps, id?: UniqueEntityID): Comment {
    const comment = new Comment({ ...props }, id);
    if (!id && props.owner_post.id.toString() !== props.userID.id.toString()) {
      comment.addDomainEvent(new PostCommentedEvent(comment));
    }
    return comment;
  }
}
