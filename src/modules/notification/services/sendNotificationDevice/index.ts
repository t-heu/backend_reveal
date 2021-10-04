import { PushNotificationExpo } from './impl/pushNotificationExpo';

const sendNotificationDevice = new PushNotificationExpo();

interface SendNotificationDevice {
  execute(data: any): Promise<void>;
}

export { sendNotificationDevice, SendNotificationDevice };
