import { number, string, z, type ZodType } from "zod";

export class AuthValidation {
  static readonly loginValidation: ZodType = z.object({
    email: string().min(1).max(100).email(),
    password: string().min(1).max(100),
  });

  static readonly resetPassword: ZodType = z.object({
    email: string().min(1).max(100).email(),
  });

  static readonly updatePassword: ZodType = z.object({
    token: number().int().gte(4),
    password: string().min(1).max(100),
  });
}
