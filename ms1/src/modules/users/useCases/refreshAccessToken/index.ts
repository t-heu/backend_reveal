import RefreshAccessTokenUseCase from '@/modules/users/useCases/refreshAccessToken/refreshAccessTokenUseCase';
import * as Controller from '@/modules/users/useCases/refreshAccessToken/refreshAccessTokenController';

const RefreshAccessTokenController = new Controller.RefreshAccessTokenController();

export { RefreshAccessTokenUseCase, RefreshAccessTokenController };
