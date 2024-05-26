import { Comment } from '../../../domain/comment';

export interface ShowAllCommentsDTO {
  page: number;
  postID: string;
}

export interface ResponseDTO {
  comments: Comment[];
  count: number;
}
