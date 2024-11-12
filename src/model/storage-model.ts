import type { post_file, user } from "@prisma/client";

export interface StorageRequest {
  avatar?: string | null;
}

export function toStorageAvatarUserResponse(user: user): StorageRequest {
  return {
    avatar: user.avatar,
  };
}

export function toStoragePostFileResponse(postFile: post_file): post_file {
  return {
    id: postFile.id,
    post_id: postFile.post_id,
    file: postFile.file,
    created_at: postFile.created_at,
    updated_at: postFile.updated_at,
  };
}
