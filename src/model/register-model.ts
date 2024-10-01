import type { user } from "@prisma/client";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export function toRegisterResponse(user: user): RegisterResponse {
  return {
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
