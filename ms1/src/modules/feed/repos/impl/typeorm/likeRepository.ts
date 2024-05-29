import { Repository } from 'typeorm';

import { Like } from '@/modules/feed/domain/like';
import LikeMap from '@/modules/feed/mappers/likeMap';
import LikeTypeorm from '@/shared/infra/database/typeorm/entity/Like';
import { ILikeRepository } from '@/modules/feed/repos/ILikeRepo';
import { appDataSource } from '@/shared/infra/database';

class LikeRepository implements ILikeRepository {
  private ormRepository: Repository<LikeTypeorm>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(LikeTypeorm);
  }

  public async exists(data: Like): Promise<boolean> {
    const like = await this.ormRepository.findOne({
      where: {
        user_id: data.userID.id.toString(),
        post_id: data.postID.id.toString(),
      }
    });

    return !!like;
  }

  public async removeLike(data: Like): Promise<void> {
    await this.ormRepository.delete({
      user_id: data.userID.id.toString(),
      post_id: data.postID.id.toString(),
    });
  }

  public async addLike(data: Like): Promise<void> {
    const liked = await LikeMap.toPersistence(data);
    const like = this.ormRepository.create(liked);
    await this.ormRepository.save(like);
  }
}

export default LikeRepository;
