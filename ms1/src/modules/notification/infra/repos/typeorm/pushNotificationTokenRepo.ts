import { Repository } from 'typeorm';

import PushNotificationTokenTypeorm from '@/shared/infra/database/typeorm/entity/PushNotificationToken';
import { appDataSource } from '@/shared/infra/database';
import {
  IPushNotificationTokenRepository,
  CreateDTO,
} from '@/modules/notification/domain/repos/IPushNotificationToken';

class PushNotificationTokenRepository implements IPushNotificationTokenRepository {
  private ormRepository: Repository<PushNotificationTokenTypeorm>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(PushNotificationTokenTypeorm);
  }

  public async addPushNotificationTokens(data: CreateDTO): Promise<void> {
    const response = await this.ormRepository.findOne({
      where: { key: data.key },
    });

    if (!response) {
      const noti = this.ormRepository.create(data);
      await this.ormRepository.save(noti);
    }
  }

  public async deletePushNotificationTokens(key: string): Promise<void> {
    await this.ormRepository.delete({
      key,
    });
  }

  public async findPushNotificationTokens(userID: string): Promise<string> {
    const response = await this.ormRepository.findOne({
      where: { user_id: userID },
    });

    return response?.key || 'empty';
  }
}

export default PushNotificationTokenRepository;
