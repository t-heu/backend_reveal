import { PushNotificationExpo } from './impl/pushNotificationExpo';
import { PushNotificationFirebase } from './impl/pushNotificationFirebase';

const platform: any = {
  firebase: new PushNotificationFirebase(),
  expo: new PushNotificationExpo(),
};

const sendNotificationDevice =
  platform[process.env.PLATFORM_SEND_NOTI || 'expo'];

interface SendNotificationDevice {
  execute(data: any): Promise<void>;
}

export { sendNotificationDevice, SendNotificationDevice };
