import { number, z, type ZodType } from "zod";
const NotificationTypeEnum = z.enum(["LIKE", "COMMENT"]);
export class NotificationValidation {
  static readonly notificationRequest: ZodType = z.object({
    to_user_id: number().int(),
    type_notification: NotificationTypeEnum,
  });
}
