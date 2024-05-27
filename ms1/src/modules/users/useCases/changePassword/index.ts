import ChangePasswordUseCase from '@/modules/users/useCases/changePassword/changePasswordUseCase';
import * as Controller from '@/modules/users/useCases/changePassword/changePasswordController';

const ChangePasswordController = new Controller.ChangePasswordController();

export { ChangePasswordUseCase, ChangePasswordController };
