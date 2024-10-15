import type { NextFunction, Response } from "express";
import type { CostumeRequest } from "../interface/request-interface";
import { PostLikeService } from "../service/post-like-service";

export class PostLikeController {
  static async storePostLike(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId: number = parseInt(req.params.postId);
      const userId: number = req.currentUser!.id;
      const result = await PostLikeService.storePostLike(postId, userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success store post like",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyPostLike(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId: number = parseInt(req.params.postId);
      const userId: number = req.currentUser!.id;
      const result = await PostLikeService.destroyPostLike(postId, userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success destroy post like",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
