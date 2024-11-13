import type { NextFunction, Response } from "express";
import type { CostumeRequest } from "../interface/request-interface";
import type { CurrentUser } from "../model/auth-model";
import type { UserFollowRequest } from "../model/user-follow-model";
import { UserFollowService } from "../service/user-follow-service";

export class UserFollowController {
  static async storeUserFollow(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const currentUser: CurrentUser = req.currentUser as CurrentUser;
      const request: UserFollowRequest = req.body as UserFollowRequest;
      const result = await UserFollowService.storeUserFollow(
        request,
        currentUser
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success follow user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
