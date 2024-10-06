import type { user } from "@prisma/client";

export interface UpdateNameRequest {
  name: string;
}

export interface UpdateEmailRequest {
  email: string;
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
