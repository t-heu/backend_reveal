import VerifyEmailUseCase from '@/modules/users/useCases/verifyEmail/verifyEmailUseCase';
import * as Controller from '@/modules/users/useCases/verifyEmail/verifyEmailController';

const VerifyEmailController = new Controller.VerifyEmailController();

export { VerifyEmailUseCase, VerifyEmailController };
