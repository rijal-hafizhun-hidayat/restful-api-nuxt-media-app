import type { NextFunction, Request, Response } from "express";

export class PostController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      return res.status(200).json({
        data: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
