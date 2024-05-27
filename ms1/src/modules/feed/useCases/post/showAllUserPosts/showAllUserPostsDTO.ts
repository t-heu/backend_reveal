import { Post } from '@/modules/feed/domain/post';

export interface ShowAllUserPostsDTO {
  id: string;
  page: number;
}

export interface ResponseDTO {
  posts: Post[];
  count: number;
}
