import GetAllHidesPostUseCase from '@/modules/feed/useCases/post/getAllHidesPost/getAllHidesPostUseCase';
import * as Controller from '@/modules/feed/useCases/post/getAllHidesPost/getAllHidesPostController';

const GetAllHidesPostController = new Controller.GetAllHidesPostController();

export { GetAllHidesPostUseCase, GetAllHidesPostController };
