import CreatePushNotificationTokensUseCase from '@/modules/notification/useCase/createPushToken/createPushTokenUseCase';
import * as Controller from '@/modules/notification/useCase/createPushToken/createPushTokenController';

const CreatePushTokenController = new Controller.CreatePushTokenController();

export { CreatePushNotificationTokensUseCase, CreatePushTokenController };
