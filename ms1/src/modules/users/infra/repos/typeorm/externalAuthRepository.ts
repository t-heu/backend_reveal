import { Repository } from 'typeorm';
import { appDataSource } from '@/shared/infra/database';

import ExternalAuth from '@/shared/infra/database/typeorm/entity/ExternalAuth';
import { CreateDTO, IExternalAuthRepository } from '@/modules/users/domain/repos/IExternalAuthRepo';

class ExternalAuthRepository implements IExternalAuthRepository {
  private ormRepository: Repository<ExternalAuth>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(ExternalAuth);
  }

  public async findLoginSocialOrCreate({
    providerName,
    provideruserID,
    userID,
  }: CreateDTO): Promise<void> {
    const response = await this.ormRepository.findOne({
      where: { providerName, provideruserID },
    });

    if (!response) {
      const userCreated = this.ormRepository.create({
        providerName,
        provideruserID,
        user_id: userID,
      });

      await this.ormRepository.save(userCreated);
    }
  }
}

export default ExternalAuthRepository;
