import { inject, injectable, delay } from 'tsyringe';

import { WebSocketHandler } from '../../../../shared/infra/ws/WebSocketHandler';
import { IPostRepository } from '../../../feed/repos/IPostRepo';
import { INotificationRepository } from '../../repos/INotification';
import { IUseCase } from '../../../../shared/domain/UseCase';
import { Notification } from '../../domain/notification';
import { UserId } from '../../../users/domain/userId';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

interface Request {
  type: string;
  title: string;
  description: string;
  link: string;
}

@injectable()
class CreateNotification implements IUseCase<Request, string> {
  constructor(
    // @ts-ignore
    @inject(delay(() => 'PostRepository'))
    private postRepository: IPostRepository,
    // @ts-ignore
    @inject(delay(() => 'NotificationRepository'))
    private notificationRepository: INotificationRepository,
    // @ts-ignore
    @inject(delay(() => 'WebSocketHandler'))
    private webSocketHandler: WebSocketHandler,
  ) {}

  public async execute(data: Request): Promise<string> {
    const { user, user_id } = await this.postRepository.getPostById(data.link);

    const userId = UserId.create(new UniqueEntityID(user_id));

    const res = Notification.create({
      type: data.type,
      link: data.link,
      userId,
      title: data.title,
      description: data.description,
    });
    await this.notificationRepository.createNotification(res);

    const resultCount =
      await this.notificationRepository.getCountNotificationNotRead(user_id);

    this.webSocketHandler.sendNotification(user_id, {
      count_notification_not_read: resultCount,
    });

    return user.notification_keys.map((k: any) => k.key);
  }
}

export default CreateNotification;
