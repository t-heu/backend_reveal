import { container } from 'tsyringe';

import DeleteNotificationKeysUseCase from './DeleteNotificationKeysUseCase';
import * as Controller from './DeleteNotificationKeysController';

const DeleteNotificationKeysController = new Controller.DeleteNotificationKeysController();
const deleteNotificationKeysUseCase = container.resolve(
  DeleteNotificationKeysUseCase,
);

export {
  DeleteNotificationKeysUseCase,
  DeleteNotificationKeysController,
  deleteNotificationKeysUseCase,
};
