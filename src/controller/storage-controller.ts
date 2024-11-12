import type { NextFunction, Request, Response } from "express";
import { StorageService } from "../service/storage-service";
import type { StorageRequest } from "../model/storage-model";

export class StorageController {
  static async updateUserAvatarByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const requestFile: Express.Multer.File = req.file as Express.Multer.File;
      const result = await StorageService.updateUserAvatarByUserId(
        userId,
        requestFile
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success update avatar",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePostFileFileByPostId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId: number = parseInt(req.params.postId);
      const requestFile: Express.Multer.File = req.file as Express.Multer.File;
      const result = await StorageService.storePostFile(postId, requestFile);
      return res.status(200).json({
        statusCode: 200,
        message: "success update post file",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
