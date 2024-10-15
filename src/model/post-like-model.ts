import type { post_like } from "@prisma/client";

export interface PostLikeResponse {
  id: number;
  user_id?: number;
  post_id?: number;
  created_at?: Date;
  updated_at?: Date;
  length?: number;
}

export function toPostLikeResponse(post_likes: post_like): PostLikeResponse {
  return {
    id: post_likes.id,
    user_id: post_likes.user_id,
    post_id: post_likes.post_id,
    created_at: post_likes.created_at,
    updated_at: post_likes.updated_at,
  };
}
