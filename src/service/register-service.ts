import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toRegisterResponse,
  type RegisterRequest,
  type RegisterResponse,
} from "../model/register-model";
import { UserUtils } from "../utils/user-utils";
import { RegisterValidation } from "../validation/register-validation";
import { Validation } from "../validation/validation";

export class RegisterService {
  static async register(request: RegisterRequest): Promise<RegisterResponse> {
    const requestBody: RegisterRequest = Validation.validate(
      RegisterValidation.registerRequest,
      request
    );

    const isEmailExist = await UserUtils.isEmailExist(requestBody.email);

    if (isEmailExist) {
      throw new ErrorResponse(404, "email already exist");
    }

    const [user] = await prisma.$transaction([
      prisma.user.create({
        data: {
          name: requestBody.name,
          email: requestBody.email,
          password: Bun.password.hashSync(requestBody.password),
        },
      }),
    ]);

    await prisma.$transaction([
      prisma.user_role.create({
        data: {
          user_id: user.id,
          role_id: 2,
        },
      }),
    ]);

    return toRegisterResponse(user);
  }
}
