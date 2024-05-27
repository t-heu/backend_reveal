import ShowAllLikesPostsUseCase from '@/modules/feed/useCases/post/showAllLikesPosts/showAllLikesPostsUseCase';
import * as Controller from '@/modules/feed/useCases/post/showAllLikesPosts/showAllLikesPostsController';

const ShowAllLikesPostsController = new Controller.ShowAllLikesPostsController();

export { ShowAllLikesPostsController, ShowAllLikesPostsUseCase };
