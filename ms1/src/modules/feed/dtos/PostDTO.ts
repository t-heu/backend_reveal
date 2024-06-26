export interface PostDTO {
  id: string;
  text: string;
  userID: string;
  dateTimePosted: Date;
  viewer_has_liked: boolean;
  viewer_count_comments: number;
  viewer_count_likes: number;
  viewer_has_hidePost: boolean;
  user?: {
    avatar_url: string;
  };
}
