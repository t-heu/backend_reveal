import { Repository } from 'typeorm';

import { HidePost } from '@/modules/feed/domain/hidePost';
import HidePostTypeorm from '@/shared/infra/database/typeorm/entity/HidePost';
import { IHidePostRepository } from '@/modules/feed/repos/IHidePostRepo';
import HidePostMap from '@/modules/feed/mappers/hidePostMap';
import { appDataSource } from '@/shared/infra/database';

class HidePostRepository implements IHidePostRepository {
  private ormRepository: Repository<HidePostTypeorm>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(HidePostTypeorm);
  }

  public async exists(data: HidePost): Promise<boolean> {
    const like = await this.ormRepository.findOne({
      where: {
        user_id: data.userID.id.toString(),
        post_id: data.postID.id.toString(),
      }
    });

    return !!like;
  }

  public async removeBlock(data: HidePost): Promise<void> {
    await this.ormRepository.delete({
      user_id: data.userID.id.toString(),
      post_id: data.postID.id.toString(),
    });
  }

  public async addBlock(data: HidePost): Promise<void> {
    const hidePost = await HidePostMap.toPersistence(data);
    const block = this.ormRepository.create(hidePost);

    await this.ormRepository.save(block);
  }
}

export default HidePostRepository;
