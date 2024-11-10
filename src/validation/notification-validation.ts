import { number, string, z, type ZodType } from "zod";
export class NotificationValidation {
  static readonly notificationRequest: ZodType = z.object({
    to_user_id: number().int(),
    notification_type_id: number().int(),
    message: string().min(1).max(100),
    content_reference: string().min(1).max(100),
  });
}
