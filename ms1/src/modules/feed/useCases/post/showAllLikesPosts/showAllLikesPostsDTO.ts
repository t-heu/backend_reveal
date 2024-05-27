import { Post } from '@/modules/feed/domain/post';

export interface ShowAllLikesPostsDTO {
  skip: number;
  userID: string;
}

export interface ResponseDTO {
  posts: Post[];
  count: number;
}
