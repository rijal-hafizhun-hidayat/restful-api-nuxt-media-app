import { string, z, type ZodType } from "zod";

export class AuthValidation {
  static readonly loginValidation: ZodType = z.object({
    email: string().min(1).max(100).email(),
    password: string().min(1).max(100),
  });
}
