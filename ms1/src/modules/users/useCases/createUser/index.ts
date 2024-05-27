import CreateUserUseCase from '@/modules/users/useCases/createUser/createUserUseCase';
import * as Controller from '@/modules/users/useCases/createUser/createUserController';

const CreateUserController = new Controller.CreateUserController();

export { CreateUserUseCase, CreateUserController };
