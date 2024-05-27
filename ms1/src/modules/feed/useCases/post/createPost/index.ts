import CreatePostUseCase from '@/modules/feed/useCases/post/createPost/createPostUseCase';
import * as Controller from '@/modules/feed/useCases/post/createPost/createPostController';

const CreatePostController = new Controller.CreatePostController();

export { CreatePostUseCase, CreatePostController };
