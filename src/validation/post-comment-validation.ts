import { string, z, type ZodType } from "zod";

export class PostCommentValidation {
  static readonly postCommentRequest: ZodType = z.object({
    comment: string().min(1),
  });
}
