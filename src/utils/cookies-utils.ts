import type { Response } from "express";

export class CookiesUtils {
  static setCookie(res: Response, token: string): any {
    res.cookie("token", token, {
      httpOnly: true, // Cookie is not accessible via JavaScript
      secure: Bun.env.APP_ENV === "production" ? true : false, // Ensure cookie is sent over HTTPS (use in production), false for development
      maxAge: 60 * 60 * 1000, // Cookie expiry: 1 hour
    });
  }
}
