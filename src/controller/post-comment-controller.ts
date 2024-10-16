import type { NextFunction, Request, Response } from "express";
import { PostCommentService } from "../service/post-comment-service";
import type { PostCommentRequest } from "../model/post-comment-model";
import type { CostumeRequest } from "../interface/request-interface";

export class PostCommentController {
  static async getAllPostCommentByPostId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId: number = parseInt(req.params.postId);
      const result = await PostCommentService.getAllPostCommentByPostId(postId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get post comments",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storePostCommentByPostId(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId: number = parseInt(req.params.postId);
      const userId: number = req.currentUser!.id;
      const request: PostCommentRequest = req.body as PostCommentRequest;
      const result = await PostCommentService.storePostCommentByPostId(
        postId,
        userId,
        request
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success store post comments",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
