import { UniqueEntityID } from '../../../shared/domain/uniqueEntityID';
import { AggregateRoot } from '../../../shared/domain/aggregateRoot';
import { PostText } from './postText';
import { PostId } from './postId';
import { UserId } from '../../users/domain/userId';
import { UserPhoto } from '../../users/domain/userPhoto';

import { DomainEvents } from '../../../shared/domain/events/domainEvents';
import { Like } from '../../feed/domain/like';
import { Comment } from '../../feed/domain/comment';
import { PostLikedEvent } from './events/postLikedEvent';
import { PostCommentedEvent } from './events/postCommentedEvent';

interface PostProps {
  userId: UserId;
  text: PostText;
  viewer_count_comments?: number;
  viewer_count_likes?: number;
  dateTimePosted?: Date;
  viewer_has_liked?: boolean;
  has_hidePost?: boolean;
  photo?: string;
  avatarUrl?: string;
}

export class Post extends AggregateRoot<PostProps> {
  get postId(): PostId {
    return PostId.create(this._id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get postLiked(): boolean {
    return this.props.viewer_has_liked || false;
  }

  get dateTimePosted(): Date {
    return this.props.dateTimePosted || new Date();
  }

  get text(): PostText {
    return this.props.text;
  }

  get totalNumComments(): number {
    return this.props.viewer_count_comments || 0;
  }

  get totalNumlikes(): number {
    return this.props.viewer_count_likes || 0;
  }

  get has_hidePost(): boolean {
    return this.props.has_hidePost || false;
  }

  get avatarUrl(): string {
    return UserPhoto.create(this.props.photo).getUrl;
  }

  private constructor(props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public addComment(comment: Comment): void {
    console.log('ID____: ', this)
    
    // this.addDomainEvent(new PostCommentedEvent(this, comment));
    // DomainEvents.dispatchEventsForAggregate(comment.id);
  }

  public addLike(like: Like): void {
    // this.addDomainEvent(new PostLikedEvent(like));
    // DomainEvents.dispatchEventsForAggregate(this.id);
  }

  public static create(props: PostProps, id?: UniqueEntityID): Post {
    const post = new Post({ ...props }, id);
    return post;
  }
}
