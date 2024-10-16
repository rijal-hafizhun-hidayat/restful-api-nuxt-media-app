import type { user } from "@prisma/client";
import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toUpdateBioResponse,
  toUpdateEmailResponse,
  toUpdateNameResponse,
  toUpdateProfileAvatar,
  toUserVerified,
  type ProfileRequest,
} from "../model/profile-model";
import { UserUtils } from "../utils/user-utils";
import { ProfileValidation } from "../validation/profile-validation";
import { Validation } from "../validation/validation";
import { FileUtils } from "../utils/file-utils";
import { toPostResponseArray, type PostResponse } from "../model/post-model";

export class ProfileService {
  static async updateProfileName(
    request: ProfileRequest,
    userId: number
  ): Promise<ProfileRequest> {
    const requestBody: ProfileRequest = Validation.validate(
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
    request: ProfileRequest,
    userId: number
  ): Promise<ProfileRequest> {
    const requestBody: ProfileRequest = Validation.validate(
      ProfileValidation.UpdateProfileEmailValidation,
      request
    );

    const isEmailAlreadyExist = await UserUtils.isEmailExist(
      requestBody.email!
    );

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
    request: ProfileRequest,
    userId: number
  ): Promise<user[]> {
    const requestBody: ProfileRequest = Validation.validate(
      ProfileValidation.UpdateProfilePasswordValidation,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const isMatch = Bun.password.verifySync(
      requestBody.oldPassword!,
      user!.password
    );

    if (!isMatch) {
      throw new ErrorResponse(404, "old password not match");
    }

    const newPassword = Bun.password.hashSync(requestBody.newPassword!);

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

  static async verifProfile(userId: number): Promise<ProfileRequest> {
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
    request: ProfileRequest,
    userId: number
  ): Promise<ProfileRequest> {
    const requestBody: ProfileRequest = Validation.validate(
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

  static async updateProfileAvatar(
    request: Express.Multer.File,
    userId: number
  ): Promise<ProfileRequest> {
    if (!request) {
      throw new ErrorResponse(400, "upload file not found");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    await FileUtils.destroyFile(`src/storage/profile/${user!.avatar}`);

    const [updateUser] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          avatar: request.filename,
        },
      }),
    ]);

    return toUpdateProfileAvatar(updateUser);
  }

  static async getAllPostByUserId(userId: number): Promise<PostResponse[]> {
    const posts = await prisma.post.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        post_like: {
          where: {
            user_id: userId,
          },
        },
        _count: {
          select: {
            post_like: true,
          },
        },
      },
    });

    return toPostResponseArray(posts);
  }
}
