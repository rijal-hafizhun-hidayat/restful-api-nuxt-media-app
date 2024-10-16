import type { user } from "@prisma/client";

export interface ProfileRequest {
  id?: number;
  name?: string;
  email?: string;
  bio?: string | null;
  email_verified_at?: Date | null;
  oldPassword?: string;
  newPassword?: string;
  avatar?: string | null;
}

export function toUpdateNameResponse(user: user): ProfileRequest {
  return {
    name: user.name,
  };
}

export function toUpdateEmailResponse(user: user): ProfileRequest {
  return {
    email: user.email,
  };
}

export function toUserVerified(user: user): ProfileRequest {
  return {
    email_verified_at: user.email_verified_at,
  };
}

export function toUpdateBioResponse(user: user): ProfileRequest {
  return {
    bio: user.bio,
  };
}

export function toUpdateProfileAvatar(user: user): ProfileRequest {
  return {
    avatar: user.avatar,
  };
}

export function toProfileResponse(profile: user): ProfileRequest {
  return {
    id: profile.id,
    name: profile.name,
    bio: profile.bio ?? null,
    avatar: profile.avatar
      ? `${process.env.BASE_URL}/storage/profile/${profile.avatar}`
      : null,
  };
}
