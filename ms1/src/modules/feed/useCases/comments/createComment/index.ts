import * as Controller from './createCommentController';
import CreateCommentUseCase from './createCommentUseCase';

const CreateCommentController = new Controller.CreateCommentController();

export { CreateCommentController, CreateCommentUseCase };
