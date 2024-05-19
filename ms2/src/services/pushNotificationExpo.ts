/* eslint-disable no-restricted-syntax, no-continue, no-await-in-loop */
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

export interface Request {
  title: string;
  body: string;
  data: any;
  link: string;
  type: string;
  user_id: string;
}

const expo = new Expo();

class PushNotificationExpo {
  public async execute({
    title,
    body,
    data,
    link,
    type,
    user_id,
  }: Request): Promise<void> {
    const messages: ExpoPushMessage[] = [];
    const somePushTokens: string[] = [];
    const tickets: any[] = [];
    const receiptIds: string[] = [];
    const token = "aaa"

    /*const token = await createNotification.execute({
      description: body,
      link,
      title,
      type,
    });*/

    if (token) {
      somePushTokens.push(...token);
    }

    for (const pushToken of somePushTokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        //deleteNotificationKeysUseCase.execute({ user_id, key: pushToken });
        continue;
      }

      messages.push({
        to: pushToken,
        sound: 'default',
        title,
        body,
        data,
      });
    }

    const chunks = expo.chunkPushNotifications(messages);

    (async () => {
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);

          if (ticketChunk[1].status === 'error') {
            console.log(ticketChunk[1].message.split('"')[1]);
            //deleteNotificationKeysUseCase.execute({
              //user_id,
              //key: ticketChunk[1].message.split('"')[1],
            //});
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();

    for (const ticket of tickets) {
      if (ticket.id) {
        receiptIds.push(ticket.id);
      }
    }

    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

    (async () => {
      for (const chunk of receiptIdChunks) {
        try {
          const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
          console.log(receipts, ' -ok');
        } catch (error) {
          console.log(error, ' - e2');
        }
      }
    })();
  }
}

export { PushNotificationExpo };
