import { WatchedList } from '@/shared/domain/watchedList';
import { Comment } from '@/modules/feed/domain/comment';

export class Comments extends WatchedList<Comment> {
  private constructor(initial: Comment[]) {
    super(initial);
  }

  public compareItems(a: Comment, b: Comment): boolean {
    return a.equals(b);
  }

  public static create(comments?: Comment[]): Comments {
    return new Comments(comments || []);
  }
}
