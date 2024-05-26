import CreatePushNotificationTokensUseCase from './createPushTokenUseCase';
import * as Controller from './createPushTokenController';

const CreatePushTokenController = new Controller.CreatePushTokenController();

export { CreatePushNotificationTokensUseCase, CreatePushTokenController };
