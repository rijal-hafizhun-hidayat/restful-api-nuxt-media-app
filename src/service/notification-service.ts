import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import type { CurrentUser } from "../model/auth-model";
import {
  toNotificationResponse,
  toNotificationResponseArray,
  type NotificationRequest,
  type NotificationResponse,
} from "../model/notification-model";
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
        notification_type_id: true,
        message: true,
        content_reference: true,
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
    currentUser: CurrentUser,
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

    const isNotificationExist = await prisma.notification.findFirst({
      where: {
        from_user_id: currentUser.id,
        to_user_id: requestBody.from_user_id,
        notification_type_id: requestBody.notification_type_id,
      },
    });

    if (isNotificationExist) {
      throw new ErrorResponse(404, "notification already exist");
    }

    const [notification] = await prisma.$transaction([
      prisma.notification.create({
        data: {
          from_user_id: currentUser.id,
          to_user_id: requestBody.to_user_id,
          message: requestBody.message,
          content_reference: requestBody.content_reference,
          is_read: false,
          notification_type_id: requestBody.notification_type_id,
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
