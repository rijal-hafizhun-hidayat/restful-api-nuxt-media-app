import { prisma } from "../app/database";
import type { RegisterRequest } from "../model/register-model";

export class UserUtils {
  static async isEmailExist(emailRequest: string) {
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: emailRequest,
      },
      include: {
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    return isEmailExist;
  }

  static async compareRole(roleUser: string, roleCompare: string) {
    if (roleUser === roleCompare) {
      return true;
    } else {
      return false;
    }
  }
}
