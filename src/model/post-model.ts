import type { post } from "@prisma/client";
import type { UserResponse } from "./user-model";
import type { PostLikeResponse } from "./post-like-model";

export interface PostResponse {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  like_count?: number;
  user?: UserResponse;
  is_liked?: boolean;
  post_like_count?: number;
  post_comment_count?: number;
}

export interface PostCount {
  post_like: number;
  post_comment: number;
}

export interface PostRequest {
  content: string;
}

export function toPostResponseArray(
  posts: (PostResponse & { user: UserResponse } & {
    post_like: PostLikeResponse[];
  } & { _count: PostCount })[]
): PostResponse[] {
  return posts.map((post) => ({
    id: post.id,
    user_id: post.user_id,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    user: {
      id: post.user.id,
      name: post.user.name,
    },
    is_liked_user: post.post_like.length > 0,
    post_like_count: post._count?.post_like,
    post_comment_count: post._count?.post_comment,
  }));
}

export function toPostResponse(post: post): PostResponse {
  return {
    id: post.id,
    user_id: post.user_id,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
  };
}
