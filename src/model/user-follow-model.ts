import type { user_follows } from "@prisma/client";

export interface UserFollowRequest {
  followed_user_id: number;
}

export interface UserFollowResponse {
  id: number;
  follower_user_id: number;
  followed_user_id: number;
  followed_at: Date;
}

export function toUserFollowResponse(
  userFollow: user_follows
): UserFollowResponse {
  return {
    id: userFollow.id,
    follower_user_id: userFollow.follower_user_id,
    followed_user_id: userFollow.followed_user_id,
    followed_at: userFollow.followed_at,
  };
}
