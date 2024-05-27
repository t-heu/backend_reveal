import AuthenticateUserUseCase from '@/modules/users/useCases/authenticateUser/authenticateUserUseCase';
import * as Controller from '@/modules/users/useCases/authenticateUser/authenticateUserController';

const AuthenticateUserController = new Controller.AuthenticateUserController();

export { AuthenticateUserUseCase, AuthenticateUserController };
