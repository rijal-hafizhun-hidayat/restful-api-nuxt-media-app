import type { user } from "@prisma/client";

export interface StorageRequest {
  avatar: string | null;
}

export function toStorageAvatarUserResponse(user: user): StorageRequest {
  return {
    avatar: user.avatar,
  };
}
