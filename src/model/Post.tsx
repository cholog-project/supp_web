export interface CreatePostForm {
  title: string;
  description: string;
  studyId: number;
}

export interface PostInfo {
  postId: number;
  postTitle: string;
  createdDate: Date;
}

export interface EachPost {
  postId: number;
  postTitle: string;
  postDescription: string;
  postMemberId: number;
  isAuthor: boolean;
}

export interface EachComment {
  commentId: number;
  commentContent: string;
  commentMemberType: string;
  commentMemberId: number;
  isAuthor: boolean;
}

export interface PostDetailInfo {
  eachPost: EachPost;
  comments: EachComment[];
}

export interface CommentForm {
  postId: number;
  content: string;
}
