import { inject, injectable, delay } from 'tsyringe';

import { WebSocketHandler } from '../../../../shared/infra/ws/webSocketHandler';
import { INotificationRepository } from '../../repos/INotification';
import { GetAllHidesPostDTO, ResponseDTO } from './getAllNotificationsDTO';
import { IUseCase } from '../../../../shared/domain/useCase';
import NotiMap from '../../mappers/notiMap';

@injectable()
class GetAllNotificationsUseCase
  implements IUseCase<GetAllHidesPostDTO, ResponseDTO>
{
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
    // @ts-ignore
    @inject(delay(() => 'WebSocketHandler'))
    private webSocketHandler: WebSocketHandler,
  ) {}

  public async execute({
    skip,
    userID,
  }: GetAllHidesPostDTO): Promise<ResponseDTO> {
    const { result, total } =
      await this.notificationRepository.getAllNotification({
        skip,
        userID,
      });

    const resultCount =
      await this.notificationRepository.getCountNotificationNotRead(userID);

    this.webSocketHandler.sendNotification(userID, {
      count_notification_not_read: resultCount,
    });

    return {
      notifications: result.map(p => NotiMap.toDTO(p)),
      count: total,
    };
  }
}

export default GetAllNotificationsUseCase;