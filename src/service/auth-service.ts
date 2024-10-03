import { ErrorResponse } from "../error/error-response";
import { toLoginResponse, type LoginRequest } from "../model/auth-model";
import type { FormatUser } from "../model/token-model";
import { Token } from "../utils/token";
import { User } from "../utils/user";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";

export class AuthService {
  static async login(request: LoginRequest): Promise<string> {
    const requestBody: LoginRequest = Validation.validate(
      AuthValidation.loginValidation,
      request
    );

    const user = await User.isEmailExist(requestBody.email);

    if (!user) {
      throw new ErrorResponse(404, "email or password is not correct");
    }

    const isMatch = await Bun.password.verify(
      requestBody.password,
      user.password
    );

    if (!isMatch) {
      throw new ErrorResponse(404, "email or password is not correctF");
    }

    const formatUser: FormatUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.user_role.map((role) => role.role),
    };

    const token = await Token.generate(formatUser);

    return toLoginResponse(token);
  }
}
