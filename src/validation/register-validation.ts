import { password } from "bun";
import { string, z, type ZodType } from "zod";

export class RegisterValidation {
  static readonly registerRequest: ZodType = z.object({
    name: string().min(1).max(100),
    email: string().min(1).max(100).email(),
    password: string().min(1).max(100),
  });
}
