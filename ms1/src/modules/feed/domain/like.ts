import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { AggregateRoot } from '@/shared/domain/aggregateRoot';
import { userId } from '@/modules/users/domain/userId';
import { postId } from '@/modules/feed/domain/postId';
import { LikeId } from '@/modules/feed/domain/likeId';
import { PostLikedEvent } from '@/modules/feed/domain/events/postLikedEvent';

interface LikeProps {
  owner_post: userId;
  postID: postId;
  userID: userId;
  dateTimePosted?: string | Date;
}

export class Like extends AggregateRoot<LikeProps> {
  get likeId(): LikeId {
    return LikeId.create(this._id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get dateTimePosted(): string | Date {
    return this.props.dateTimePosted || new Date();
  }

  get postID(): postId {
    return this.props.postID;
  }

  get userID(): userId {
    return this.props.userID;
  }

  private constructor(props: LikeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: LikeProps, id?: UniqueEntityID): Like {
    const like = new Like({ ...props }, id);

    if (!id && props.owner_post.id.toString() !== props.userID.id.toString()) {
      like.addDomainEvent(new PostLikedEvent(like));
    }
    return like;
  }
}
