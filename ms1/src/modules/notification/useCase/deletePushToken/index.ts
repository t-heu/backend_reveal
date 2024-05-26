import { container } from 'tsyringe';

import DeletePushNotificationTokenUseCase from './deletePushTokenUseCase';
import * as Controller from './deletePushTokenController';

const DeletePushTokenController = new Controller.DeletePushTokenController();
const deletePushNotificationTokensUseCase = container.resolve(
  DeletePushNotificationTokenUseCase,
);

export {
  DeletePushNotificationTokenUseCase,
  DeletePushTokenController,
  deletePushNotificationTokensUseCase,
};
