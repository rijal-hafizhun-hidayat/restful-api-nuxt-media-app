import { string } from "zod";

export interface LoginRequest {
  email: string;
  password: string;
}

export function toLoginResponse(token: string) {
  return token;
}
