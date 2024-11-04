import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toStorageAvatarUserResponse,
  type StorageRequest,
} from "../model/storage-model";
import { FileUtils } from "../utils/file-utils";

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
}
