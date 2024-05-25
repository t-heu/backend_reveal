import { container } from 'tsyringe';

import DeleteNotificationKeysUseCase from './deleteNotificationKeysUseCase';
import * as Controller from './deleteNotificationKeysController';

const DeleteNotificationKeysController = new Controller.DeleteNotificationKeysController();
const deleteNotificationKeysUseCase = container.resolve(
  DeleteNotificationKeysUseCase,
);

export {
  DeleteNotificationKeysUseCase,
  DeleteNotificationKeysController,
  deleteNotificationKeysUseCase,
};
