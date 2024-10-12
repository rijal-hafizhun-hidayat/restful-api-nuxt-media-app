import { prisma } from "../app/database";
import {
  toPostResponse,
  toPostResponseArray,
  type PostRequest,
  type PostResponse,
} from "../model/post-model";
import { PostValidation } from "../validation/post-validation";
import { Validation } from "../validation/validation";

export class PostService {
  static async getAll(): Promise<PostResponse[]> {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return toPostResponseArray(posts);
  }

  static async storePostByUserId(
    request: PostRequest,
    userId: number
  ): Promise<PostResponse> {
    const requestBody: PostRequest = Validation.validate(
      PostValidation.postRequest,
      request
    );

    const [storePost] = await prisma.$transaction([
      prisma.post.create({
        data: {
          user_id: userId,
          content: requestBody.content,
        },
      }),
    ]);

    return toPostResponse(storePost);
  }
}
