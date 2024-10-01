import { prisma } from "../app/database";
import type { RegisterRequest } from "../model/register-model";

export class User {
  static async isEmailExist(request: RegisterRequest) {
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: request.email,
      },
    });

    return isEmailExist;
  }
}
