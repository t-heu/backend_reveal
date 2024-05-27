import RegisterWithGoogleUseCase from '@/modules/users/useCases/registerWithGoogle/registerWithGoogleUseCase';
import * as Controller from '@/modules/users/useCases/registerWithGoogle/registerWithGoogleController';

const RegisterWithGoogleController = new Controller.RegisterWithGoogleController();

export { RegisterWithGoogleUseCase, RegisterWithGoogleController };
