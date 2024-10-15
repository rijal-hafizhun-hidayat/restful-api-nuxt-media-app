import type { post, post_like } from "@prisma/client";
import type { UserResponse } from "./user-model";
import type { PostLikeResponse } from "./post-like-model";

export interface PostResponse {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  user?: UserResponse;
  is_liked?: boolean;
}

export interface PostRequest {
  content: string;
}

export function toPostResponseArray(
  posts: (post & { user: UserResponse } & {
    post_like: PostLikeResponse[];
  })[]
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
    is_liked: post.post_like.length! > 0,
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
