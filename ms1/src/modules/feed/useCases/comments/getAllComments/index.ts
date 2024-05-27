import * as Controller from '@/modules/feed/useCases/comments/getAllComments/getAllCommentsController';
import GetAllCommentsUseCase from '@/modules/feed/useCases/comments/getAllComments/getAllCommentsUseCase';

const GetAllCommentsController = new Controller.GetAllCommentsController();

export { GetAllCommentsController, GetAllCommentsUseCase };
