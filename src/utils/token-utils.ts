import type { FormatUser } from "../model/token-model";
import Jwt from "jsonwebtoken";

export class TokenUtils {
  static async generate(user: FormatUser) {
    const token = Jwt.sign(
      {
        data: user,
      },
      process.env.JWT_KEY as string,
      { expiresIn: "1h" }
    );

    return token;
  }
}
