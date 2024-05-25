import CreateUserUseCase from './createUserUseCase';
import * as Controller from './createUserController';

const CreateUserController = new Controller.CreateUserController();

export { CreateUserUseCase, CreateUserController };
