import UpdateUserNameUseCase from '@/modules/users/useCases/updateUserName/updateUserNameUseCase';
import * as Controller from '@/modules/users/useCases/updateUserName/updateUserNameController';

const UpdateUserNameController = new Controller.UserUpdateNameController();

export { UpdateUserNameUseCase, UpdateUserNameController };
