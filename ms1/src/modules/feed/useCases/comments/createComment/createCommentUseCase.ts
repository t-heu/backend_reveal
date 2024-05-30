import { inject, injectable } from 'tsyringe';

import { ICommentRepository } from '@/modules/feed/domain/repos/ICommentRepo';
import { IPostRepository } from '@/modules/feed/domain/repos/IPostRepo';
import { AddCommentDTO } from '@/modules/feed/useCases/comments/createComment/createCommentDTO';
import { IUseCase } from '@/shared/domain/useCase';
import { CommentText } from '@/modules/feed/domain/commentText';
import { Comment } from '@/modules/feed/domain/comment';
import { postId } from '@/modules/feed/domain/postId';
import { userId } from '@/modules/users/domain/userId';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';

@injectable()
class CreateCommentUseCase implements IUseCase<AddCommentDTO, void> {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({
    postID,
    userID,
    answer,
  }: AddCommentDTO): Promise<void> {
    const text = CommentText.create({ value: answer });

    const post = await this.postRepository.getPostById(postID);

    const comment = Comment.create({
      owner_post: userId.create(new UniqueEntityID(post.userID.id.toString())),
      text,
      userID: userId.create(new UniqueEntityID(userID)),
      postID: postId.create(new UniqueEntityID(postID)),
    });

    // post.addComment(comment);
    await this.commentRepository.create(comment);
  }
}

export default CreateCommentUseCase;
