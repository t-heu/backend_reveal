import { Request } from '../models/sendNotificationDevice';
import { createNotification } from '../../../useCase/createNotification';
import { deleteNotificationKeysUseCase } from '../../../useCase/deleteNotificationKeys';

class PushNotificationFirebase {
  public async execute({
    title,
    body,
    link,
    type,
    user_id,
  }: Request): Promise<void> {
    const token = await createNotification.execute({
      description: body,
      link,
      title,
      type,
    });
    try {
      await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.FCM_SERVER_KEY as string, // `key=<FCM-SERVER-KEY>`,
        },
        body: JSON.stringify({
          to: token, // '<NATIVE-DEVICE-PUSH-TOKEN>',
          priority: 'normal',
          data: {
            experienceId: '@matheud/reveal', // '@yourExpoUsername/yourProjectSlug',
            title,
            message: body,
          },
        }),
      });
    } catch (err) {
      deleteNotificationKeysUseCase.execute({ user_id, key: token });
    }
  }
}

export { PushNotificationFirebase };
