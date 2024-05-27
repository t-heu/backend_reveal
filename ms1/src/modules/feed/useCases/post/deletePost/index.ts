import * as Controller from '@/modules/feed/useCases/post/deletePost/deletePostController';
import DeletePostUseCase from '@/modules/feed/useCases/post/deletePost/deletePostUseCase';

const DeletePostController = new Controller.DeletePostController();

export { DeletePostUseCase, DeletePostController };
