import type { user } from "@prisma/client";
import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toUpdateBioResponse,
  toUpdateEmailResponse,
  toUpdateNameResponse,
  toUserVerified,
  type UpdateBioRequest,
  type UpdateEmailRequest,
  type UpdateNameRequest,
  type UpdateProfilePasswordRequest,
  type UserVerified,
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

  static async updateProfilePassword(
    request: UpdateProfilePasswordRequest,
    userId: number
  ): Promise<user[]> {
    const requestBody: UpdateProfilePasswordRequest = Validation.validate(
      ProfileValidation.UpdateProfilePasswordValidation,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const isMatch = Bun.password.verifySync(
      requestBody.oldPassword,
      user!.password
    );

    if (!isMatch) {
      throw new ErrorResponse(404, "old password not match");
    }

    const newPassword = Bun.password.hashSync(requestBody.newPassword);

    return await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: newPassword,
        },
      }),
    ]);
  }

  static async verifProfile(userId: number): Promise<UserVerified> {
    const date: Date = new Date();

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email_verified_at: date,
        },
      }),
    ]);

    return toUserVerified(user);
  }

  static async updateProfileBio(
    request: UpdateBioRequest,
    userId: number
  ): Promise<UpdateBioRequest> {
    const requestBody: UpdateBioRequest = Validation.validate(
      ProfileValidation.UpdateProfileBioValidation,
      request
    );

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          bio: requestBody.bio,
        },
      }),
    ]);

    return toUpdateBioResponse(user);
  }
}
