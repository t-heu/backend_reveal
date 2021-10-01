import { inject, injectable, delay } from 'tsyringe';

import { io, connectUsers } from '../../../../shared/infra/ws';
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

    const resultCount = await this.notificationRepository.getCountNotificationNotRead(
      user_id,
    );

    if (io.io) {
      // Envia nova/atualiza quantidade de notificações novas no client
      io.io.to(connectUsers[user_id]).emit('count_notification_not_read', {
        count_notification_not_read: resultCount,
      });
    }

    return user.notification_key;
  }
}

export default CreateNotification;
