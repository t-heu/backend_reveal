import { inject, injectable, delay } from 'tsyringe';

import { IPushNotificationTokenRepository } from '../../repos/IPushNotificationToken';
import { RequestDTO } from './deletePushTokenDTO';
import { IUseCase } from '../../../../shared/domain/useCase';

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
