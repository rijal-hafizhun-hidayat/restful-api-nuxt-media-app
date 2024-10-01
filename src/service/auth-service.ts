import type { LoginRequest } from "../model/auth-model";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";

export class AuthService {
  static async login(request: LoginRequest): Promise<any> {
    const requestBody: LoginRequest = Validation.validate(
      AuthValidation.loginValidation,
      request
    );

    return requestBody;
  }
}
