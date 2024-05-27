import ShowOnePostUseCase from '@/modules/feed/useCases/post/showOnePost/showOnePostUseCase';
import * as Controller from '@/modules/feed/useCases/post/showOnePost/showOnePostController';

const ShowOnePostController = new Controller.ShowOnePostController();

export { ShowOnePostUseCase, ShowOnePostController };
