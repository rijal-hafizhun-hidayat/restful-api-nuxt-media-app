import type { notification } from "@prisma/client";
import type { UserResponse } from "./user-model";

export type TypeNotification = "LIKE_POST" | "COMMENT_POST";
export interface NotificationRequest {
  from_user_id?: number;
  to_user_id: number;
  type_notification: TypeNotification;
  type_notification_id: number;
}
export interface NotificationResponse {
  id: number;
  from_user_id: number;
  message: string;
  is_read: boolean;
  to_user_id: number;
  type_notification: TypeNotification;
  type_notification_id: number;
  created_at: Date;
  updated_at: Date;
  from_user?: UserResponse;
}
export function toNotificationResponse(
  notification: notification
): NotificationResponse {
  return {
    id: notification.id,
    from_user_id: notification.from_user_id,
    to_user_id: notification.to_user_id,
    message: notification.message,
    is_read: notification.is_read,
    type_notification: notification.type_notification,
    type_notification_id: notification.type_notification_id,
    created_at: notification.created_at,
    updated_at: notification.updated_at,
  };
}

export function toNotificationResponseArray(
  notifications: (notification & { from_user: UserResponse })[]
): NotificationResponse[] {
  return notifications.map((notification) => ({
    id: notification.id,
    from_user_id: notification.from_user_id,
    message: notification.message,
    to_user_id: notification.to_user_id,
    is_read: notification.is_read,
    type_notification: notification.type_notification,
    type_notification_id: notification.type_notification_id,
    created_at: notification.created_at,
    updated_at: notification.updated_at,
    from_user: {
      id: notification.from_user.id,
      name: notification.from_user.name,
      avatar: notification.from_user.avatar
        ? `${Bun.env.BASE_URL}/storage/profile/${notification.from_user.avatar}`
        : null,
    },
  }));
}
