import ResetPasswordUseCase from '@/modules/users/useCases/resetPassword/resetPasswordUseCase';
import * as Controller from '@/modules/users/useCases/resetPassword/resetPasswordController';

const ResetPasswordController = new Controller.ResetPasswordController();

export { ResetPasswordUseCase, ResetPasswordController };
