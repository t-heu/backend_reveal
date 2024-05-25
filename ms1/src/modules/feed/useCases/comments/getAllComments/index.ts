import * as Controller from './getAllCommentsController';
import GetAllCommentsUseCase from './getAllCommentsUseCase';

const GetAllCommentsController = new Controller.GetAllCommentsController();

export { GetAllCommentsController, GetAllCommentsUseCase };
