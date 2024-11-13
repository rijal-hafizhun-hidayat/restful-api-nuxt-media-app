import { number, z, type ZodType } from "zod";

export class UserFollowValidation {
  static readonly userFollowRequest: ZodType = z.object({
    followed_user_id: number().int(),
  });
}
