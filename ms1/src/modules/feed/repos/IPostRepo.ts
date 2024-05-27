import { Post } from '@/modules/feed/domain/post';
import PostTypeorm from '@/shared/infra/database/typeorm/entity/Post';
export interface IResponseAndCount {
  result: Post[];
  total: number;
}

export interface FindAndCountDTO {
  userID: string;
  skip: number;
}

export interface FindDescriptionDTO {
  skip?: number;
  search: string;
  userID: string;
}
export interface IPost extends PostTypeorm {
  viewer_has_liked: boolean;
}

export interface IPostRepository {
  getPostById(id: string, userID?: string): Promise<Post>;
  exists(postID: string): Promise<boolean>;
  create(data: Post): Promise<void>;
  delete(id: string): Promise<void>;
  findAllUserPosts({
    userID,
    skip,
  }: FindAndCountDTO): Promise<IResponseAndCount>;
  getAllPost({ userID, skip }: FindAndCountDTO): Promise<IResponseAndCount>;
  getAllPostSearch({
    skip,
    search,
    userID,
  }: FindDescriptionDTO): Promise<IResponseAndCount>;
  getAllPostLiked({
    userID,
    skip,
  }: FindAndCountDTO): Promise<IResponseAndCount>;
  getAllPostsHide({
    userID,
    skip,
  }: FindAndCountDTO): Promise<IResponseAndCount>;
}
