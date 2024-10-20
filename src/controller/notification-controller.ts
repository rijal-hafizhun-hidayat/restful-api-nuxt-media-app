import type { NextFunction, Response } from "express";
import type { CostumeRequest } from "../interface/request-interface";
import type { NotificationRequest } from "../model/notification-model";
import { NotificationService } from "../service/notification-service";

export class NotificationController {
  static async getAllNotificationByToUserId(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = req.currentUser!.id;
      const result = await NotificationService.getAllNotificationByToUserId(
        userId
      );

      return res.status(200).json({
        statusCode: 200,
        message: "success get notification",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  static async storeNotification(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const fromUserId: number = req.currentUser!.id;
      const request: NotificationRequest = req.body;
      const result = await NotificationService.storeNotification(
        fromUserId,
        request
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success store notification",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
