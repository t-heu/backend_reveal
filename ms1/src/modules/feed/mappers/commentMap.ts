import { Mapper } from '@/shared/infra/mapper';
import { Comment } from '@/modules/feed/domain/comment';
import { CommentDTO } from '@/modules/feed/dtos/CommentDTO';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { CommentText } from '@/modules/feed/domain/commentText';
import { userId } from '@/modules/users/domain/userId';
import { postId } from '@/modules/feed/domain/postId';

class CommentMap implements Mapper<Comment> {
  public toDTO(t: Comment): CommentDTO {
    return {
      id: t.id.toValue().toString(),
      text: t.text.value,
      dateTimePosted: new Date(t.dateTimePosted),
      avatar_URL: t.avatarUrl,
      user_id: String(t.userID),
      post_id: String(t.postID),
    };
  }

  public toDomain(raw: any): Comment {
    const commentTextOrError = CommentText.create({ value: raw.answer });

    const comment = Comment.create(
      {
        text: commentTextOrError,
        dateTimePosted: new Date(raw.createdAt),
        photo: raw.user.photo,
        userID: userId.create(new UniqueEntityID(raw.user_id)),
        postID: postId.create(new UniqueEntityID(raw.post_id)),
        owner_post: userId.create(new UniqueEntityID(raw.user_id)),
      },
      new UniqueEntityID(raw.id),
    );

    return comment;
  }

  public async toPersistence(t: Comment): Promise<any> {
    return {
      id: t.id.toValue().toString(),
      answer: t.text.value,
      createdAt: t.dateTimePosted,
      user_id: t.userID.id.toString(),
      post_id: t.postID.id.toString(),
    };
  }
}

export default new CommentMap();
