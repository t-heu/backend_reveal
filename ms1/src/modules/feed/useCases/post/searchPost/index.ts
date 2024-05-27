import * as Controller from '@/modules/feed/useCases/post/searchPost/searchPostController';
import SearchPostUseCase from '@/modules/feed/useCases/post/searchPost/searchPostUseCase';

const SearchPostController = new Controller.SearchPostController();

export { SearchPostUseCase, SearchPostController };
