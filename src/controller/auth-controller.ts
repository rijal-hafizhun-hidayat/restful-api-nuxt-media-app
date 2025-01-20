import type { NextFunction, Request, Response } from "express";
import type { LoginRequest } from "../model/auth-model";
import { AuthService } from "../service/auth-service";
import type {
  ResetPasswordRequest,
  UpdatePasswordRequest,
} from "../model/reset-password-model";
import type { CostumeRequest } from "../interface/request-interface";

export class AuthController {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const result: any = await AuthService.login(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success login",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: ResetPasswordRequest = req.body as ResetPasswordRequest;
      const result = await AuthService.resetPassword(request);
      return res.status(200).json({
        statusCode: 200,
        message: "send token reset password success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: UpdatePasswordRequest = req.body as UpdatePasswordRequest;
      const result = await AuthService.updatePassword(request);
      return res.status(200).json({
        statusCode: 200,
        message: "reset password success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMe(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      return res.status(200).json({
        data: req.currentUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
