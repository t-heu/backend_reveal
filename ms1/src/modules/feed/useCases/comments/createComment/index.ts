import * as Controller from '@/modules/feed/useCases/comments/createComment/createCommentController';
import CreateCommentUseCase from '@/modules/feed/useCases/comments/createComment/createCommentUseCase';

const CreateCommentController = new Controller.CreateCommentController();

export { CreateCommentController, CreateCommentUseCase };
