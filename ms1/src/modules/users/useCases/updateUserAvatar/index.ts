import UpdateUserAvatarUseCase from '@/modules/users/useCases/updateUserAvatar/updateUserAvatarUseCase';
import * as Controller from '@/modules/users/useCases/updateUserAvatar/updateUserAvatarController';

const UpdateUserAvatarController = new Controller.UpdateUserAvatarController();

export { UpdateUserAvatarUseCase, UpdateUserAvatarController };
