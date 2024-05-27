import { Repository, getRepository } from 'typeorm';

import CommentTypeorm from '@/shared/infra/database/typeorm/entity/Comment';
import { Comment } from '@/modules/feed/domain/comment';
import { ICommentRepository, ResponseFindAllCount } from '@/modules/feed/repos/ICommentRepo';
import CommentMap from '@/modules/feed/mappers/commentMap';

class CommentRepository implements ICommentRepository {
  private ormRepository: Repository<CommentTypeorm>;

  constructor() {
    this.ormRepository = getRepository(CommentTypeorm);
  }

  public async create(data: Comment): Promise<void> {
    const response = await CommentMap.toPersistence(data);
    const comment = this.ormRepository.create(response);

    await this.ormRepository.save(comment);
  }

  public async findAllCount(
    skip: number,
    postID: string,
  ): Promise<ResponseFindAllCount> {
    const [result, total] = await this.ormRepository.findAndCount({
      where: { post_id: postID },
      order: { createdAt: 'DESC' },
      take: 10,
      skip,
      relations: ['user'],
    });

    return {
      result: result.map(p => CommentMap.toDomain(p)),
      total,
    };
  }
}

export default CommentRepository;
