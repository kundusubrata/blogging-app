export type Author = {
  id: string;
  firstname: string;
  lastname: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  _count: {
    likes: number;
    comments: number;
  };
  comments: Comment[];
  likes: Like[];
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  posts: Post[];
  role: string;
  likes: Like[];
  comments: Comment[];
};

export type Like = {
  id: string;
  userId: string;
  postId: string;
};

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
};

export type GetPostsResponse = {
  success: boolean;
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  posts: Post[];
};
export type GetSinglePostResponse = {
  success: boolean;
  post: Post;
};
export type GetLikeResponse = {
  success: boolean;
  message: string;
};

export type AddCommentResponse = {
  success: boolean;
  comment: Comment;
};

export type GetCommentsResponse = {
  success: boolean;
  comments: Comment[];
};

export type AuthResponse = {
  success: boolean;
  token: string;
  user: User;
};

export type LogoutResponse = {
  message: string;
};

export type MyProfileResponse = {
  success: boolean;
  user: User;
};

export type UpdateProfileResponse = {
  success: boolean;
  user: User;
};

export type CreatePostResponse = {
  success: boolean;
  post: Post;
};

export type GetMyPostResponse = {
  success: boolean;
  posts: Post[];
};

export type DeletePostResponse = {
  success: boolean;
  message: string;
};

export type EditPostResponse = {
  success: boolean;
  post: Post;
};

export type SignupRequest = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type SigninRequest = {
  email: string;
  password: string;
};

export type UpdateProfileRequest = {
  firstname: string;
  lastname: string;
  email: string;
};

export type CreatePostRequest = {
  title: string;
  content: string;
};

export type AddCommentRequest = {
  postId: string;
  content: string;
};

export type EditPostRequest = {
  id: string;
  body: {
    title: string;
    content: string;
  };
};
