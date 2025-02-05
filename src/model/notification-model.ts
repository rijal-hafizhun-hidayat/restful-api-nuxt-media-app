import type { notification, notification_type } from "@prisma/client";
import type { UserResponse } from "./user-model";

export interface NotificationRequest {
  from_user_id?: number;
  to_user_id: number;
  notification_type_id: number;
  content_reference: string;
  message: string;
}
export interface NotificationResponse {
  id: number;
  from_user_id: number;
  message: string;
  content_reference: string;
  is_read: boolean;
  to_user_id: number;
  notification_type_id: number;
  created_at: Date;
  updated_at: Date;
  from_user?: UserResponse;
  notification_type?: notification_type;
}
export function toNotificationResponse(
  notification: notification
): NotificationResponse {
  return {
    id: notification.id,
    from_user_id: notification.from_user_id,
    to_user_id: notification.to_user_id,
    message: notification.message,
    content_reference: notification.content_reference,
    is_read: notification.is_read,
    notification_type_id: notification.notification_type_id,
    created_at: notification.created_at,
    updated_at: notification.updated_at,
  };
}

export function toNotificationResponseArray(
  notifications: NotificationResponse[]
): NotificationResponse[] {
  return notifications.map((notification) => ({
    id: notification.id,
    from_user_id: notification.from_user_id,
    message: notification.message,
    content_reference: notification.content_reference,
    to_user_id: notification.to_user_id,
    is_read: notification.is_read,
    notification_type_id: notification.notification_type_id,
    created_at: notification.created_at,
    updated_at: notification.updated_at,
    from_user: {
      id: notification.from_user!.id,
      name: notification.from_user!.name,
      avatar: notification.from_user!.avatar
        ? `${Bun.env.BASE_URL}/storage/profile/${
            notification.from_user!.avatar
          }`
        : null,
    },
    notification_type: {
      id: notification.notification_type!.id,
      name: notification.notification_type!.name,
      created_at: notification.notification_type!.created_at,
      updated_at: notification.notification_type!.updated_at,
    },
  }));
}
