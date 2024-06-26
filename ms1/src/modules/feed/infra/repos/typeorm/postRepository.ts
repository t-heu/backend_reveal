import { Repository } from 'typeorm';

import PostTypeorm from '@/shared/infra/database/typeorm/entity/Post';
import { appDataSource } from '@/shared/infra/database';
import {
  IPostRepository,
  IResponseAndCount,
  FindDescriptionDTO,
  FindAndCountDTO,
  IPost,
} from '@/modules/feed/domain/repos/IPostRepo';
import PostMap from '@/modules/feed/mappers/postMap';
import { Post } from '@/modules/feed/domain/post';

class PostRepository implements IPostRepository {
  private ormRepository: Repository<PostTypeorm>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(PostTypeorm);
  }

  public async create(data: Post): Promise<void> {
    const response = await PostMap.toPersistence(data);
    const post = this.ormRepository.create(response);

    await this.ormRepository.save(post);
  }

  public async exists(postID: string): Promise<boolean> {
    const post = await this.ormRepository
      .createQueryBuilder('post')
      .where({ id: postID });

    return !!post;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async getPostById(id: string, userID?: string): Promise<Post> {
    if (id && userID) {
      const result = <IPost>await this.ormRepository
        .createQueryBuilder('post')
        .leftJoin('post.hide_posts', 'hide_posts')
        .leftJoin('post.likes', 'likes')
        .loadRelationCountAndMap('post.viewer_count_likes', 'post.likes')
        .leftJoin('post.comments', 'comments')
        .loadRelationCountAndMap('post.viewer_count_comments', 'post.comments')
        // .leftJoinAndSelect('comments.user', 'user')
        .where({ id })
        .getOne();

      if (!result) throw new Error('Post not found');

      const liked = await this.ormRepository
        .createQueryBuilder('post')
        .leftJoin('post.likes', 'likes')
        .where('likes.user_id = :userID AND likes.post_id = :postID', {
          userID,
          postID: id,
        })
        .getOne();

      result.viewer_has_liked = Boolean(liked);

      return PostMap.toDomain(result);
    }

    const result = <IPost>(
      await this.ormRepository
        .createQueryBuilder('post')
        .leftJoin('post.hide_posts', 'hide_posts')
        .leftJoin('post.likes', 'likes')
        .loadRelationCountAndMap('post.viewer_count_likes', 'post.likes')
        .leftJoin('post.comments', 'comments')
        .loadRelationCountAndMap('post.viewer_count_comments', 'post.comments')
        .leftJoinAndSelect('post.user', 'users')
        .leftJoinAndSelect('users.notification_keys', 'notification_keys')
        .where({ id })
        .getOne()
    );

    if (!result) throw new Error('Post not found');

    return PostMap.toDomain(result);
  }

  public async findAllUserPosts({
    userID,
    skip,
  }: FindAndCountDTO): Promise<IResponseAndCount> {
    const [result, total] = await this.ormRepository
      .createQueryBuilder('post')
      .leftJoin('post.hide_posts', 'hide_posts')
      .andWhere('hide_posts.user_id != :userID OR hide_posts.user_id IS NULL', {
        userID,
      })
      .leftJoin('post.comments', 'comments')
      .loadRelationCountAndMap('post.viewer_count_comments', 'post.comments')
      .leftJoinAndSelect('post.likes', 'likes', 'likes.user_id = :userID', {
        userID,
      })
      .loadRelationCountAndMap('post.viewer_count_likes', 'post.likes')
      .leftJoinAndSelect('post.user', 'users')
      .where({ user_id: userID })
      .skip(skip)
      .take(10)
      .orderBy('post.createdAt', 'DESC')
      .getManyAndCount();

    const response = result.map(res => {
      const count = res.likes.length;
      return {
        ...res,
        viewer_has_liked: Boolean(count),
        has_hidePost: !(userID === res.user_id),
      };
    });

    return {
      result: response.map(p => PostMap.toDomain(p)),
      total,
    };
  }

  public async getAllPostSearch({
    skip = 0,
    search,
    userID,
  }: FindDescriptionDTO): Promise<IResponseAndCount> {
    const [result, total] = await this.ormRepository
      .createQueryBuilder('post')
      .leftJoin('post.hide_posts', 'hide_posts')
      .andWhere('hide_posts.user_id != :userID OR hide_posts.user_id IS NULL', {
        userID,
      })
      .leftJoin('post.comments', 'comments')
      .loadRelationCountAndMap('post.viewer_count_comments', 'post.comments')
      .leftJoinAndSelect('post.likes', 'likes', 'likes.user_id = :userID', {
        userID,
      })
      .loadRelationCountAndMap('post.viewer_count_likes', 'post.likes')
      .leftJoinAndSelect('post.user', 'users')
      .where('description like :search', { search: `%${search}%` })
      .orderBy('post.description', 'ASC')
      .skip(skip)
      .take(10)
      .getManyAndCount();

    const response = result.map(res => {
      const count = res.likes.length;
      return {
        ...res,
        viewer_has_liked: Boolean(count),
        has_hidePost: !(userID === res.user_id),
      };
    });

    return {
      result: response.map(p => PostMap.toDomain(p)),
      total,
    };
  }

  public async getAllPost({
    userID,
    skip,
  }: FindAndCountDTO): Promise<IResponseAndCount> {
    const [result, total] = await this.ormRepository
      .createQueryBuilder('post')
      .leftJoin('post.hide_posts', 'hide_posts')
      .where('hide_posts.user_id != :userID OR hide_posts.user_id IS NULL', {
        userID,
      })
      .leftJoin('post.comments', 'comments')
      .loadRelationCountAndMap('post.viewer_count_comments', 'post.comments')
      .leftJoinAndSelect('post.likes', 'likes', 'likes.user_id = :userID', {
        userID,
      })
      .loadRelationCountAndMap('post.viewer_count_likes', 'post.likes')
      .leftJoinAndSelect('post.user', 'users')
      .skip(skip)
      .take(10)
      .orderBy('post.createdAt', 'DESC')
      .getManyAndCount();

    const response = result.map(res => {
      const count = res.likes.length;
      return {
        ...res,
        viewer_has_liked: Boolean(count),
        has_hidePost: !(userID === res.user_id),
      };
    });

    return {
      result: response.map(p => PostMap.toDomain(p)),
      total,
    };
  }

  public async getAllPostLiked({
    userID,
    skip,
  }: FindAndCountDTO): Promise<IResponseAndCount> {
    const [result, total] = await this.ormRepository
      .createQueryBuilder('post')
      .leftJoin('post.hide_posts', 'hide_posts')
      .andWhere('hide_posts.user_id != :userID OR hide_posts.user_id IS NULL', {
        userID,
      })
      .leftJoin('post.comments', 'comments')
      .loadRelationCountAndMap('post.viewer_count_comments', 'post.comments')
      .leftJoinAndSelect('post.likes', 'likes', 'likes.user_id = :userID', {
        userID,
      })
      .loadRelationCountAndMap('post.viewer_count_likes', 'post.likes')
      .leftJoinAndSelect('post.user', 'users')
      .where(
        'hide_posts.user_id != :userID OR hide_posts.user_id IS NULL AND likes.user_id = :userID',
        { userID },
      )
      .skip(skip)
      .take(10)
      .getManyAndCount();

    const response = result.map(res => {
      const count = res.likes.length;
      return {
        ...res,
        viewer_has_liked: Boolean(count),
        has_hidePost: !(userID === res.user_id),
      };
    });

    return {
      result: response.map(p => PostMap.toDomain(p)),
      total,
    };
  }

  public async getAllPostsHide({
    userID,
    skip,
  }: FindAndCountDTO): Promise<IResponseAndCount> {
    const [result, total] = await this.ormRepository
      .createQueryBuilder('post')
      // .leftJoin('post.hide_posts', 'hide_posts')
      .leftJoin('post.comments', 'comments')
      .loadRelationCountAndMap('post.viewer_count_comments', 'post.comments')
      .leftJoinAndSelect(
        'post.hide_posts',
        'hide_posts',
        'hide_posts.user_id = :userID',
        {
          userID,
        },
      )
      .leftJoinAndSelect('post.likes', 'likes', 'likes.user_id = :userID', {
        userID,
      })
      .loadRelationCountAndMap('post.viewer_count_likes', 'post.likes')
      .leftJoinAndSelect('post.user', 'users')
      .where('hide_posts.user_id = :userID', { userID })
      .skip(skip)
      .take(10)
      .getManyAndCount();

    const response = result.map(res => {
      const count = res.likes.length;
      return {
        ...res,
        viewer_has_liked: Boolean(count),
        has_hidePost: !(userID === res.user_id),
      };
    });

    return {
      result: response.map(p => PostMap.toDomain(p)),
      total,
    };
  }
}

export default PostRepository;
