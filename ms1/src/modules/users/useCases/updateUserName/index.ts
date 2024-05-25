import UpdateUserNameUseCase from './updateUserNameUseCase';
import * as Controller from './updateUserNameController';

const UpdateUserNameController = new Controller.UserUpdateNameController();

export { UpdateUserNameUseCase, UpdateUserNameController };
