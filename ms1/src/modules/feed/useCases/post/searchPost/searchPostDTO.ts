import { Post } from '@/modules/feed/domain/post';

export interface SearchPostDTO {
  search: string;
  userID: string;
  page: number;
}

export interface ResponseDTO {
  posts: Post[];
  count: number;
}
