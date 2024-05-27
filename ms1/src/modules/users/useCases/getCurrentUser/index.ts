import GetCurrentUserUseCase from '@/modules/users/useCases/getCurrentUser/getCurrentUserUseCase';
import * as Controller from '@/modules/users/useCases/getCurrentUser/getCurrentUserController';

const GetCurrentUserUserController = new Controller.GetCurrentUserUserController();

export { GetCurrentUserUseCase, GetCurrentUserUserController };
