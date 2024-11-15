import type { NextFunction, Response } from "express";
import type { CostumeRequest } from "../interface/request-interface";
import type { CurrentUser } from "../model/auth-model";
import { NavbarService } from "../service/navbar-service";
import type { NavbarResponse } from "../model/navbar-model";

export class Navbar {
  static async getCount(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const currentUser: CurrentUser = req.currentUser as CurrentUser;
      const result: NavbarResponse = await NavbarService.getCount(currentUser);
      return res.status(200).json({
        statusCode: 200,
        message: "success get navbar",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
