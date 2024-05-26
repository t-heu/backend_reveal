import { Mapper } from '@/shared/infra/mapper';
import { HidePost } from '../domain/hidePost';

// @ts-ignore
class HidePostMap implements Mapper<HidePost> {
  public async toPersistence(t: HidePost): Promise<any> {
    return {
      createdAt: t.dateTimePosted,
      user_id: t.userID.id.toValue(),
      post_id: t.postID.id.toValue(),
    };
  }
}

export default new HidePostMap();
