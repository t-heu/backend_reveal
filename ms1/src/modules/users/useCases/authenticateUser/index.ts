import AuthenticateUserUseCase from './authenticateUserUseCase';
import * as Controller from './authenticateUserController';

const AuthenticateUserController = new Controller.AuthenticateUserController();

export { AuthenticateUserUseCase, AuthenticateUserController };
