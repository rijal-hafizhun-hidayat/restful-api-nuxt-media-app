import type { NextFunction, Request, Response } from "express";

export class ProfileController {
  static async verifProfile(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        statusCode: 200,
        message: "success verified",
      });
    } catch (error) {
      next(error);
    }
  }
}
