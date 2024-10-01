import type { NextFunction, Request, Response } from "express";
import type { RegisterRequest } from "../model/register-model";
import { RegisterService } from "../service/register-service";

export class RegisterController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: RegisterRequest = req.body as RegisterRequest;
      const result: any = await RegisterService.register(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
