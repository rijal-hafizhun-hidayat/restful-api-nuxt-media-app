import type { reset_password, user } from "@prisma/client";

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordResponse {
  token: number;
  expired_at: Date;
}

export interface UpdatePasswordRequest {
  token: number;
  password: string;
}

export function toResetPasswordResponse(
  reset_password: reset_password
): ResetPasswordResponse {
  return {
    token: reset_password.token,
    expired_at: reset_password.expired_at,
  };
}

export function toUpdatePasswordResponse(user: user): ResetPasswordRequest {
  return {
    email: user.email,
  };
}
