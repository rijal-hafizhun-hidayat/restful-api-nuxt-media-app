import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { toLoginResponse, type LoginRequest } from "../model/auth-model";
import type { EmailRequest } from "../model/email-model";
import {
  toResetPasswordResponse,
  toUpdatePasswordResponse,
  type ResetPasswordRequest,
  type ResetPasswordResponse,
  type UpdatePasswordRequest,
} from "../model/reset-password-model";
import { DateUtils } from "../utils/date-utils";
import { SendEmailUtils } from "../utils/send-email-utils";
import { TokenUtils } from "../utils/token-utils";
import { UserUtils } from "../utils/user-utils";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";

export class AuthService {
  static async login(request: LoginRequest): Promise<string> {
    const requestBody: LoginRequest = Validation.validate(
      AuthValidation.loginValidation,
      request
    );

    const user = await UserUtils.isEmailExist(requestBody.email);

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

    const userId: number = user.id;

    const token = await TokenUtils.generate(userId);

    return toLoginResponse(token);
  }

  static async resetPassword(
    request: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    const requestBody: ResetPasswordRequest = Validation.validate(
      AuthValidation.resetPassword,
      request
    );

    const user = await UserUtils.isEmailExist(requestBody.email);

    if (!user) {
      throw new ErrorResponse(404, "user not exist");
    }

    const isResetPasswordExist = await prisma.reset_password.findUnique({
      where: {
        user_id: user.id,
      },
    });

    if (isResetPasswordExist) {
      await prisma.$transaction([
        prisma.reset_password.delete({
          where: {
            id: isResetPasswordExist.id,
          },
        }),
      ]);
    }

    const randomDigit: number = Math.floor(1000 + Math.random() * 9000);
    const date = new Date();
    const expiredAt = await DateUtils.addMinutes(date, 10);

    const [reset_password] = await prisma.$transaction([
      prisma.reset_password.create({
        data: {
          user_id: user.id,
          token: randomDigit,
          expired_at: expiredAt,
        },
      }),
    ]);

    const dataEmail: EmailRequest = {
      from: "rijal.1344@gmail.com",
      to: user.email,
      subject: "token reset password",
      text: `Dear ${user.email}, here is the token reset password, ${randomDigit}`,
    };

    await SendEmailUtils.send(dataEmail);

    return toResetPasswordResponse(reset_password);
  }

  static async updatePassword(
    request: UpdatePasswordRequest
  ): Promise<ResetPasswordRequest> {
    const requestBody: UpdatePasswordRequest = Validation.validate(
      AuthValidation.updatePassword,
      request
    );

    const resetPassword = await prisma.reset_password.findUnique({
      where: {
        token: requestBody.token,
      },
    });

    if (!resetPassword) {
      throw new ErrorResponse(404, "token invalid");
    }

    const currentDate: Date = new Date();

    if (currentDate > resetPassword.expired_at) {
      throw new ErrorResponse(404, "token expired");
    }

    const newPassword = Bun.password.hashSync(requestBody.password);

    const [updatedUser] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: resetPassword.user_id,
        },
        data: {
          password: newPassword,
        },
      }),
    ]);

    return toUpdatePasswordResponse(updatedUser);
  }
}
