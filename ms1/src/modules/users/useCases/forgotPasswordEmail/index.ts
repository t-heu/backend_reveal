import ForgotPasswordEmailUseCase from './ForgotPasswordEmailUseCase';
import * as Controller from './ForgotPasswordEmailController';

const ForgotPasswordEmailController =
  new Controller.ForgotPasswordEmailController();

export { ForgotPasswordEmailUseCase, ForgotPasswordEmailController };
