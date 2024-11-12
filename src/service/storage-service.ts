import type { post_file } from "@prisma/client";
import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toStorageAvatarUserResponse,
  toStoragePostFileResponse,
  type StorageRequest,
} from "../model/storage-model";
import { FileUtils } from "../utils/file-utils";
import { file } from "bun";

export class StorageService {
  static async updateUserAvatarByUserId(
    userId: number,
    requestFile: Express.Multer.File
  ): Promise<StorageRequest> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    await FileUtils.destroyFile(`src/storage/profile/${user.avatar}`);

    const [updatedUser] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          avatar: requestFile.filename,
        },
      }),
    ]);

    return toStorageAvatarUserResponse(updatedUser);
  }

  static async storePostFile(
    postId: number,
    requestFile: Express.Multer.File
  ): Promise<post_file> {
    const isPostExist = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!isPostExist) {
      throw new ErrorResponse(404, "post not found");
    }

    const [updatedPostFile] = await prisma.$transaction([
      prisma.post_file.update({
        where: {
          post_id: postId,
        },
        data: {
          file: requestFile.filename,
        },
      }),
    ]);

    return toStoragePostFileResponse(updatedPostFile);
  }
}
