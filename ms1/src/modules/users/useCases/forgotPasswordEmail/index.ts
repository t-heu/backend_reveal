import ForgotPasswordEmailUseCase from './forgotPasswordEmailUseCase';
import * as Controller from './forgotPasswordEmailController';

const ForgotPasswordEmailController =
  new Controller.ForgotPasswordEmailController();

export { ForgotPasswordEmailUseCase, ForgotPasswordEmailController };
