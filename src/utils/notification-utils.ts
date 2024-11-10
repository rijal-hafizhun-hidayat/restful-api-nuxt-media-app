export class NotificationUtils {
  static setMessage(typeNotification: string) {
    if (typeNotification === "LIKE") {
      return "menyukai postinganmu";
    } else if (typeNotification === "COMMENT") {
      return "mengomentari postingamu";
    }
  }
}
