import { AfterCommentedPost } from '@/modules/feed/subscribers/afterCommentedPost';
import { AfterLikedPost } from '@/modules/feed/subscribers/afterLikedPost';

new AfterCommentedPost();
new AfterLikedPost();
