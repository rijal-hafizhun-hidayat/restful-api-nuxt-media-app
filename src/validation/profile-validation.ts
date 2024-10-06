import { string, z, type ZodType } from "zod";

export class ProfileValidation {
  static readonly UpdateProfileNameValidation: ZodType = z.object({
    name: string().min(1).max(100),
  });

  static readonly UpdateProfileEmailValidation: ZodType = z.object({
    email: string().min(1).max(100).email(),
  });
}
