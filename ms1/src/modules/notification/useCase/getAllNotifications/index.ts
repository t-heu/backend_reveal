import GetAllNotificationsUseCase from '@/modules/notification/useCase/getAllNotifications/getAllNotificationsUseCase';
import * as Controller from '@/modules/notification/useCase/getAllNotifications/getAllNotificationsController';

const GetAllNotificationsController = new Controller.GetAllNotificationsController();

export { GetAllNotificationsUseCase, GetAllNotificationsController };
