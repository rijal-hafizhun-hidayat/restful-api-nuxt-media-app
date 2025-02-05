import type { role } from "@prisma/client";
import type { UserWithRole } from "./user-role-model";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  token: string;
  role: role[];
}

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  email_verified_at: Date | null;
  avatar: string | null;
  role: role[];
  followed_user_count: number;
}

export function toLoginResponse(
  user: UserWithRole,
  token: string
): LoginResponse {
  return {
    id: user.id,
    name: user.name,
    role: user.user_role.map((userRole) => userRole.role),
    token: token,
  };
}
