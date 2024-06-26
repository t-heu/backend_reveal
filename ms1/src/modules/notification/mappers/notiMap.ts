import { Mapper } from '@/shared/infra/mapper';
import { Notis } from '@/modules/notification/dtos/Noti';
import { Notification } from '@/modules/notification/domain/notification';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { userId } from '@/modules/users/domain/userId';

class NotificationMap implements Mapper<Notification> {
  public toDTO(t: Notification): Notis {
    return {
      id: t.id.toValue().toString(),
      title: t.title.toString(),
      description: t.description.toString(),
      link: t.link.toString(),
      dateTimePosted: new Date(t.dateTimePosted),
      read: t.read,
    };
  }

  public toDomain(raw: any): Notification {
    const notification = Notification.create(
      {
        description: raw.description,
        type: raw.type,
        title: raw.title,
        dateTimePosted: new Date(raw.createdAt),
        userID: userId.create(new UniqueEntityID(raw.user_id)),
        link: raw.link,
        read: raw.read,
      },
      new UniqueEntityID(raw.id),
    );

    return notification;
  }

  public async toPersistence(t: Notification): Promise<any> {
    return {
      type: t.type.toString(),
      description: t.description.toString(),
      createdAt: t.dateTimePosted,
      user_id: t.userID.id.toString(),
      link: t.link.toString(),
      title: t.title.toString(),
    };
  }
}

export default new NotificationMap();
