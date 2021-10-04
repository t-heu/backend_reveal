import { inject, injectable, delay } from 'tsyringe';

import { INotificationKeyRepository } from '../../repos/INotificationKeys';
import { RequestDTO } from './DeleteNotificationKeysDTO';
import { IUseCase } from '../../../../shared/domain/UseCase';

@injectable()
class DeleteNotificationKeysUseCase implements IUseCase<RequestDTO, void> {
  constructor(
    // @ts-ignore
    @inject(delay(() => 'NotificationKeyRepository'))
    private notificationKeyRepository: INotificationKeyRepository,
  ) {}

  public async execute({ user_id, key }: RequestDTO): Promise<void> {
    await this.notificationKeyRepository.deleteNotificationKeys({
      key,
      user_id,
    });
  }
}

export default DeleteNotificationKeysUseCase;
