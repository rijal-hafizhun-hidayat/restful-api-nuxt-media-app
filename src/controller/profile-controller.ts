import type { NextFunction, Request, Response } from "express";
import type { ProfileRequest } from "../model/profile-model";
import { ProfileService } from "../service/profile-service";
import type { CostumeRequest } from "../interface/request-interface";
import type { CurrentUser } from "../model/auth-model";

export class ProfileController {
  static async getProfile(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      return res.status(200).json({
        statusCode: 200,
        message: "success get profile",
        data: req.currentUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfileByUserId(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const currentUser: CurrentUser = req.currentUser as CurrentUser;
      const userId: number = parseInt(req.params.userId);
      const result = await ProfileService.getProfileByUserId(
        userId,
        currentUser
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success get profile",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifProfile(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = req.currentUser!.id;
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
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: ProfileRequest = req.body as ProfileRequest;
      const userId: number = req.currentUser!.id;
      const result: ProfileRequest = await ProfileService.updateProfileName(
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
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: ProfileRequest = req.body as ProfileRequest;
      const userId: number = req.currentUser!.id;
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
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: ProfileRequest = req.body as ProfileRequest;
      const userId: number = req.currentUser!.id;
      await ProfileService.updateProfilePassword(request, userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success update password",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfileBio(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: ProfileRequest = req.body as ProfileRequest;
      const userId: number = req.currentUser!.id;
      const result = await ProfileService.updateProfileBio(request, userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success update bio",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfileAvatar(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const file = req.file as Express.Multer.File;
      const userId: number = req.currentUser!.id;
      const result = await ProfileService.updateProfileAvatar(file, userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success update avatar",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPostByCurrentUser(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = req.currentUser!.id;
      const result = await ProfileService.getAllPostByCurrentUser(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get profile active post",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPostByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const result = await ProfileService.getAllPostByUserId(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get profile post",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
