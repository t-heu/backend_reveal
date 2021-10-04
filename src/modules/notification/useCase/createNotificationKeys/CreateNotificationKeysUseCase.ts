import { inject, injectable } from 'tsyringe';

import { INotificationKeyRepository } from '../../repos/INotificationKeys';
import { RequestDTO } from './CreateNotificationKeysDTO';
import { IUseCase } from '../../../../shared/domain/UseCase';

@injectable()
class CreateNotificationKeysUseCase implements IUseCase<RequestDTO, void> {
  constructor(
    @inject('NotificationKeyRepository')
    private notificationKeyRepository: INotificationKeyRepository,
  ) {}

  public async execute({ user_id, key }: RequestDTO): Promise<void> {
    await this.notificationKeyRepository.addNotificationKeys({
      key,
      user_id,
    });
  }
}

export default CreateNotificationKeysUseCase;
