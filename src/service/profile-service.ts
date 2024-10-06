import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toUpdateEmailResponse,
  toUpdateNameResponse,
  type UpdateEmailRequest,
  type UpdateNameRequest,
} from "../model/profile-model";
import { UserUtils } from "../utils/user-utils";
import { ProfileValidation } from "../validation/profile-validation";
import { Validation } from "../validation/validation";

export class ProfileService {
  static async updateProfileName(
    request: UpdateNameRequest,
    userId: number
  ): Promise<UpdateNameRequest> {
    const requestBody: UpdateNameRequest = Validation.validate(
      ProfileValidation.UpdateProfileNameValidation,
      request
    );

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toUpdateNameResponse(user);
  }

  static async updateProfileEmail(
    request: UpdateEmailRequest,
    userId: number
  ): Promise<UpdateEmailRequest> {
    const requestBody: UpdateEmailRequest = Validation.validate(
      ProfileValidation.UpdateProfileEmailValidation,
      request
    );

    const isEmailAlreadyExist = await UserUtils.isEmailExist(requestBody.email);

    if (isEmailAlreadyExist) {
      throw new ErrorResponse(404, "email already exist");
    }

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email: requestBody.email,
        },
      }),
    ]);

    return toUpdateEmailResponse(user);
  }
}
