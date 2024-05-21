import { inject, injectable } from 'tsyringe';

import { WebSocketHandler } from '../../../../shared/infra/ws/WebSocketHandler';
import { INotificationRepository } from '../../repos/INotification';
import { RequestDTO } from './ClearNotificationDTO';
import { IUseCase } from '../../../../shared/domain/UseCase';

@injectable()
class GetCountNotificationNotReadUseCase implements IUseCase<RequestDTO, void> {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
    // @ts-ignore
    @inject(delay(() => 'WebSocketHandler'))
    private webSocketHandler: WebSocketHandler,
  ) {}

  public async execute({ userID }: RequestDTO): Promise<void> {
    await this.notificationRepository.updateNotificationRead(userID);

    const result =
      await this.notificationRepository.getCountNotificationNotRead(userID);

    this.webSocketHandler.sendNotification(userID, {
      count_notification_not_read: result,
    });
  }
}

export default GetCountNotificationNotReadUseCase;
