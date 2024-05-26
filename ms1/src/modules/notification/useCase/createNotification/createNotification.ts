import { inject, injectable, delay } from 'tsyringe';

import { WebSocketHandler } from '../../../../shared/infra/ws/webSocketHandler';
import { IPostRepository } from '../../../feed/repos/IPostRepo';
import { INotificationRepository } from '../../repos/INotification';
import { IPushNotificationTokenRepository } from '../../repos/IPushNotificationToken';
import { IUseCase } from '../../../../shared/domain/useCase';
import { Notification } from '../../domain/notification';

interface Request {
  type: 'comment' | 'like';
  title: string;
  description: string;
  postID: string;
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
    // @ts-ignore
    @inject(delay(() => 'PushNotificationTokenRepository'))
    private pushNotificationTokenRepository: IPushNotificationTokenRepository,
  ) {}

  public async execute(data: Request): Promise<string> {
    const {userId} = await this.postRepository.getPostById(data.postID);
    
    const user_id = userId.id.toString();

    const res = Notification.create({
      type: data.type,
      link: data.postID,
      userId,
      title: data.title,
      description: data.description,
    });
    await this.notificationRepository.createNotification(res);

    const resultCount = await this.notificationRepository.getCountNotificationNotRead(user_id);

    this.webSocketHandler.sendNotification(user_id, {
      count_notification_not_read: resultCount,
    });

    const key = await this.pushNotificationTokenRepository.findPushNotificationTokens(user_id);

    return key;
  }
}

export default CreateNotification;