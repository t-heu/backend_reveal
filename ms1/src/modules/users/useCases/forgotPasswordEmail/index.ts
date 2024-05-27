import ForgotPasswordEmailUseCase from '@/modules/users/useCases/forgotPasswordEmail/forgotPasswordEmailUseCase';
import * as Controller from '@/modules/users/useCases/forgotPasswordEmail/forgotPasswordEmailController';

const ForgotPasswordEmailController =
  new Controller.ForgotPasswordEmailController();

export { ForgotPasswordEmailUseCase, ForgotPasswordEmailController };
