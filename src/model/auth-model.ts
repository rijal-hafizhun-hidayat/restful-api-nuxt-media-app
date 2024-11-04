import type { role } from "@prisma/client";
import type { UserWithRole } from "./user-role-model";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  token: string;
  role: role[];
}

export function toLoginResponse(
  user: UserWithRole,
  token: string
): LoginResponse {
  return {
    name: user.name,
    role: user.user_role.map((userRole) => userRole.role),
    token: token,
  };
}
