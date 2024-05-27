import ClearNotificationUseCase from '@/modules/notification/useCase/clearNotification/clearNotificationUseCase';
import * as Controller from '@/modules/notification/useCase/clearNotification/clearNotificationController';

const ClearNotificationController = new Controller.ClearNotificationController();

export { ClearNotificationUseCase, ClearNotificationController };
