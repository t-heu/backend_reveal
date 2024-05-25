import RefreshAccessTokenUseCase from './refreshAccessTokenUseCase';
import * as Controller from './refreshAccessTokenController';

const RefreshAccessTokenController = new Controller.RefreshAccessTokenController();

export { RefreshAccessTokenUseCase, RefreshAccessTokenController };
