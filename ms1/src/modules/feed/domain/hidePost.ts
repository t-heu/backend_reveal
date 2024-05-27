import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { AggregateRoot } from '@/shared/domain/aggregateRoot';
import { userId } from '@/modules/users/domain/userId';
import { postId } from '@/modules/feed/domain/postId';
import { HidepostId } from '@/modules/feed/domain/hidePostId';

interface HidePostProps {
  postID: postId;
  userID: userId;
  dateTimePosted?: string | Date;
}

export class HidePost extends AggregateRoot<HidePostProps> {
  get likeId(): HidepostId {
    return HidepostId.create(this._id);
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

  private constructor(props: HidePostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: HidePostProps, id?: UniqueEntityID): HidePost {
    const like = new HidePost({ ...props }, id);
    return like;
  }
}
