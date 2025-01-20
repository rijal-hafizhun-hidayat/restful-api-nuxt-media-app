import type { NextFunction, Response } from "express";
import { PostService } from "../service/post-service";
import type { PostRequest } from "../model/post-model";
import type { CostumeRequest } from "../interface/request-interface";
import type { CurrentUser } from "../model/auth-model";

export class PostController {
  static async getAllByUserId(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = req.currentUser!.id;
      const result = await PostService.getAllByUserId(userId);
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

  static async findPostByPostId(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const currentUser: CurrentUser = req.currentUser as CurrentUser;
      const postId: number = parseInt(req.params.postId);
      const result = await PostService.findPostByPostId(currentUser, postId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get post",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
