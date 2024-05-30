import { inject, injectable, delay } from 'tsyringe';

import { IPushNotificationTokenRepository } from '@/modules/notification/domain/repos/IPushNotificationToken';
import { RequestDTO } from '@/modules/notification/useCase/deletePushToken/deletePushTokenDTO';
import { IUseCase } from '@/shared/domain/useCase';

@injectable()
class DeletePushTokenUseCase implements IUseCase<RequestDTO, void> {
  constructor(
    // @ts-ignore
    @inject(delay(() => 'PushNotificationTokenRepository'))
    private PushNotificationTokenRepository: IPushNotificationTokenRepository,
  ) {}

  public async execute({ key }: RequestDTO): Promise<void> {
    await this.PushNotificationTokenRepository.deletePushNotificationTokens(key);
  }
}

export default DeletePushTokenUseCase;
