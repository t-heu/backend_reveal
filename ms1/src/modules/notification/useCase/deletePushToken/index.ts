import { container } from 'tsyringe';

import DeletePushNotificationTokenUseCase from '@/modules/notification/useCase/deletePushToken/deletePushTokenUseCase';
import * as Controller from '@/modules/notification/useCase/deletePushToken/deletePushTokenController';

const DeletePushTokenController = new Controller.DeletePushTokenController();
const deletePushNotificationTokensUseCase = container.resolve(
  DeletePushNotificationTokenUseCase,
);

export {
  DeletePushNotificationTokenUseCase,
  DeletePushTokenController,
  deletePushNotificationTokensUseCase,
};
