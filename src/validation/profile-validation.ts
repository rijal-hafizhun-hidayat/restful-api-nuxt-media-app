import { string, z, type ZodType } from "zod";

export class ProfileValidation {
  static readonly UpdateProfileNameValidation: ZodType = z.object({
    name: string().min(1).max(100),
  });

  static readonly UpdateProfileEmailValidation: ZodType = z.object({
    email: string().min(1).max(100).email(),
  });

  static readonly UpdateProfilePasswordValidation: ZodType = z.object({
    newPassword: string().min(1).max(100),
    oldPassword: string().min(1).max(100),
  });

  static readonly UpdateProfileBioValidation: ZodType = z.object({
    bio: string().min(1).max(100),
  });
}
