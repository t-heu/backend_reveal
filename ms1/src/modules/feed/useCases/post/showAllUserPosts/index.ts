import ShowAllUserPostsUseCase from '@/modules/feed/useCases/post/showAllUserPosts/showAllUserPostsUseCase';
import * as Controller from '@/modules/feed/useCases/post/showAllUserPosts/showAllUserPostsController';

const ShowAllUserPostsController = new Controller.ShowAllUserPostsController();

export { ShowAllUserPostsUseCase, ShowAllUserPostsController };
