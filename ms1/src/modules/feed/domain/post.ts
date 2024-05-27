import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { AggregateRoot } from '@/shared/domain/aggregateRoot';
import { PostText } from '@/modules/feed/domain/postText';
import { postId } from '@/modules/feed/domain/postId';
import { userId } from '@/modules/users/domain/userId';
import { UserPhoto } from '@/modules/users/domain/userPhoto';

interface PostProps {
  userID: postId;
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
  get postID(): postId {
    return postId.create(this._id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get userID(): userId {
    return this.props.userID;
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

  public static create(props: PostProps, id?: UniqueEntityID): Post {
    const post = new Post({ ...props }, id);
    return post;
  }
}
