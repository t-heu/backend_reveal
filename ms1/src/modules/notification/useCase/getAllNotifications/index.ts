import GetAllNotificationsUseCase from './getAllNotificationsUseCase';
import * as Controller from './getAllNotificationsController';

const GetAllNotificationsController = new Controller.GetAllNotificationsController();

export { GetAllNotificationsUseCase, GetAllNotificationsController };
