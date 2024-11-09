import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toNotificationResponse,
  toNotificationResponseArray,
  type NotificationRequest,
  type NotificationResponse,
} from "../model/notification-model";
import { NotificationUtils } from "../utils/notification-utils";
import { NotificationValidation } from "../validation/notification-validation";
import { Validation } from "../validation/validation";

export class NotificationService {
  static async getAllNotificationByToUserId(
    userId: number
  ): Promise<NotificationResponse[]> {
    const notifications = await prisma.notification.findMany({
      where: {
        to_user_id: userId,
      },
      select: {
        id: true,
        is_read: true,
        from_user_id: true,
        to_user_id: true,
        type_notification: true,
        message: true,
        created_at: true,
        updated_at: true,
        from_user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return toNotificationResponseArray(notifications);
  }
  static async storeNotification(
    fromUserId: number,
    request: NotificationRequest
  ): Promise<NotificationResponse> {
    const requestBody: NotificationRequest = Validation.validate(
      NotificationValidation.notificationRequest,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        id: requestBody.to_user_id,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not exist");
    }

    const messageNotification = NotificationUtils.setMessage(
      requestBody.type_notification
    );

    const [notification] = await prisma.$transaction([
      prisma.notification.create({
        data: {
          from_user_id: fromUserId,
          to_user_id: requestBody.to_user_id,
          message: messageNotification as string,
          is_read: false,
          type_notification: requestBody.type_notification,
        },
      }),
    ]);

    return toNotificationResponse(notification);
  }

  static async updateNotificationIsRead(
    notificationId: number
  ): Promise<NotificationResponse> {
    const [notification] = await prisma.$transaction([
      prisma.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          is_read: true,
        },
      }),
    ]);

    return toNotificationResponse(notification);
  }
}
