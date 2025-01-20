import type { NextFunction, Request, Response } from "express";
import type { PostFileRequest } from "../model/post-file-model";
import { PostFileService } from "../service/post-file-service";

export class PostFileController {
  static async storePostFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: PostFileRequest = req.body as PostFileRequest;
      const result = await PostFileService.storePostFile(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store post file",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
