import { string, z, type ZodType } from "zod";

export class PostValidation {
  static readonly postRequest: ZodType = z.object({
    content: string().min(1),
  });
}
