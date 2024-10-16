import type { ProfileRequest } from "./profile-model";

export interface PostCommentResponse {
  id: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  user_id?: number;
  post_id?: number;
  user?: ProfileRequest;
}

export interface PostCommentRequest {
  comment: string;
}

export function toPostCommentResponseArray(
  postComments: (PostCommentResponse & { user: ProfileRequest })[]
): PostCommentResponse[] {
  return postComments.map((postComment) => ({
    id: postComment.id,
    comment: postComment.comment,
    created_at: postComment.created_at,
    updated_at: postComment.updated_at,
    user: {
      name: postComment.user.name,
      avatar: postComment.user.avatar
        ? `${process.env.BASE_URL}/storage/profile/${postComment.user.avatar}`
        : null,
    },
  }));
}

export function toPostCommentResponse(
  postComment: PostCommentResponse
): PostCommentResponse {
  return {
    id: postComment.id,
    comment: postComment.comment,
    created_at: postComment.created_at,
    updated_at: postComment.updated_at,
    user_id: postComment.user_id,
    post_id: postComment.post_id,
  };
}
