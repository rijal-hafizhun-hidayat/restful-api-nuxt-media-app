import type { NextFunction, Request, Response } from "express";
import { PostService } from "../service/post-service";
import type { PostRequest } from "../model/post-model";
import type { CostumeRequest } from "../interface/request-interface";

export class PostController {
  static async getAllByUserId(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = req.currentUser!.id;
      const result = await PostService.getAll(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get post",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storePostByUserId(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: PostRequest = req.body as PostRequest;
      const userId: number = req.currentUser!.id;
      const result = await PostService.storePostByUserId(request, userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success create post",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
