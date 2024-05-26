import { Repository, getRepository } from 'typeorm';

import ExternalAuth from '@/shared/infra/database/typeorm/entity/ExternalAuth';
import { ICreateDTO, IExternalAuthRepository } from '../../IExternalAuthRepo';

class ExternalAuthRepository implements IExternalAuthRepository {
  private ormRepository: Repository<ExternalAuth>;

  constructor() {
    this.ormRepository = getRepository(ExternalAuth);
  }

  public async findLoginSocialOrCreate({
    providerName,
    provideruserID,
    userID,
  }: ICreateDTO): Promise<void> {
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
