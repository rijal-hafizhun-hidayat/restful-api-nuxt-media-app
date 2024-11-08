import type { user } from "@prisma/client";

export interface UpdateNameRequest {
  name: string;
}

export interface UpdateEmailRequest {
  email: string;
}

export interface UserVerified {
  email_verified_at: Date | null;
}

export interface UpdateProfilePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export function toUpdateNameResponse(user: user): UpdateNameRequest {
  return {
    name: user.name,
  };
}

export function toUpdateEmailResponse(user: user): UpdateEmailRequest {
  return {
    email: user.email,
  };
}

export function toUserVerified(user: user): UserVerified {
  return {
    email_verified_at: user.email_verified_at,
  };
}
