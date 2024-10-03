import type { FormatUser } from "../model/token-model";
import Jwt from "jsonwebtoken";

export class Token {
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
