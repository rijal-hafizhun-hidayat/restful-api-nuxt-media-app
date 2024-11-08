import type { NextFunction, Request, Response } from "express";
import type {
  UpdateEmailRequest,
  UpdateNameRequest,
  UpdateProfilePasswordRequest,
} from "../model/profile-model";
import { ProfileService } from "../service/profile-service";

export class ProfileController {
  static async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: (req as any).currentUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = (req as any).currentUser.id;
      const result = await ProfileService.verifProfile(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success verified",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfileName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: UpdateNameRequest = req.body as UpdateNameRequest;
      const userId: number = (req as any).currentUser.id;
      const result: UpdateNameRequest = await ProfileService.updateProfileName(
        request,
        userId
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success update name",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfileEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: UpdateEmailRequest = req.body as UpdateEmailRequest;
      const userId: number = (req as any).currentUser.id;
      const result = await ProfileService.updateProfileEmail(request, userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success update email",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfilePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: UpdateProfilePasswordRequest = req.body;
      const userId: number = (req as any).currentUser.id;
      await ProfileService.updateProfilePassword(request, userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success update password",
      });
    } catch (error) {
      next(error);
    }
  }
}
