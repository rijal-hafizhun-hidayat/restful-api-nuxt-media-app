export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  token: string;
}

export function toLoginResponse(name: string, token: string): LoginResponse {
  return {
    name: name,
    token: token,
  };
}
