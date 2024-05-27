import SwitchLikePostUseCase from '@/modules/feed/useCases/post/switchLikePost/switchLikePostUseCase';
import * as Controller from '@/modules/feed/useCases/post/switchLikePost/switchLikePostController';

const SwitchLikePostController = new Controller.SwitchLikePostController();

export { SwitchLikePostUseCase, SwitchLikePostController };
