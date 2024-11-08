import { ErrorResponse } from "../error/error-response";
import type { FormatUser } from "../model/token-model";
import Jwt from "jsonwebtoken";

export class TokenUtils {
  static async generate(userId: number) {
    const token = Jwt.sign(
      {
        userId: userId,
      },
      process.env.JWT_KEY as string,
      { expiresIn: "1h" }
    );

    return token;
  }

  static async verifyToken(token: string) {
    const blacklist = new Set<string>();

    if (blacklist.has(token)) {
      throw new Error("token is revoked");
    }

    return Jwt.verify(token, process.env.JWT_KEY as string);
  }
}
