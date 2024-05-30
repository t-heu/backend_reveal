import { inject, injectable } from 'tsyringe';

import { IPushNotificationTokenRepository } from '@/modules/notification/domain/repos/IPushNotificationToken';
import { RequestDTO } from '@/modules/notification/useCase/createPushToken/createPushTokenDTO';
import { IUseCase } from '@/shared/domain/useCase';

@injectable()
class CreatePushTokenUseCase implements IUseCase<RequestDTO, void> {
  constructor(
    @inject('PushNotificationTokenRepository')
    private PushNotificationTokenRepository: IPushNotificationTokenRepository,
  ) {}

  public async execute({ user_id, key }: RequestDTO): Promise<void> {
    await this.PushNotificationTokenRepository.addPushNotificationTokens({
      key,
      user_id,
    });
  }
}

export default CreatePushTokenUseCase;
