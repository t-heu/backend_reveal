import { Repository, getRepository } from 'typeorm';

import NotificationKeyTypeorm from '../../../../../shared/infra/database/typeorm/entity/NotificationKey';
import {
  INotificationKeyRepository,
  ICreateDTO,
} from '../../INotificationKeys';

class NotificationKeyRepository implements INotificationKeyRepository {
  private ormRepository: Repository<NotificationKeyTypeorm>;

  constructor() {
    this.ormRepository = getRepository(NotificationKeyTypeorm);
  }

  public async addNotificationKeys(data: ICreateDTO): Promise<void> {
    const response = await this.ormRepository.findOne({
      where: { key: data.key },
    });

    if (!response) {
      const noti = this.ormRepository.create(data);
      await this.ormRepository.save(noti);
    }
  }

  public async deleteNotificationKeys(data: ICreateDTO): Promise<void> {
    await this.ormRepository.delete({
      key: data.key,
    });
  }
}

export default NotificationKeyRepository;
