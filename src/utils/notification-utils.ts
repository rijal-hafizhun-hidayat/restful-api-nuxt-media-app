import type { user } from "@prisma/client";

export class NotificationUtils {
  static setMessage(user: user, typeNotification: string) {
    if (typeNotification === "LIKE_POST") {
      return "menyukai postinganmu";
    } else if (typeNotification === "COMMENT_POST") {
      return "mengomentari postingamu";
    }
  }
}
