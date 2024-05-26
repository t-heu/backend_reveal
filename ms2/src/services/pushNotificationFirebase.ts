
export interface Request {
  title: string;
  body: string;
  data: any;
  link: string;
  type: string;
  user_id: string;
}

class PushNotificationFirebase {
  public async execute({
    title,
    body,
    link,
    type,
    user_id,
  }: Request): Promise<void> {
    const token = "aa"

    /* const token = await createNotification.execute({
      description: body,
      link,
      title,
      type,
    });*/

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
      console.log("deleted")
      //deletePushNotificationTokensUseCase.execute({ user_id, key: token });
    }
  }
}

export { PushNotificationFirebase };
