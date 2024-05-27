import { Mapper } from '@/shared/infra/mapper';
import { Like } from '@/modules/feed/domain/like';

// @ts-ignore
class LikeMap implements Mapper<Like> {
  public async toPersistence(t: Like): Promise<any> {
    return {
      id: t.id.toString(),
      createdAt: t.dateTimePosted,
      post_id: t.postID.id.toValue(),
      user_id: t.userID.id.toValue(),
    };
  }
}

export default new LikeMap();
