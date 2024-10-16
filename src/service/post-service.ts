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
  static async getAll(userId: number): Promise<PostResponse[]> {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        post_like: {
          where: {
            user_id: userId,
          },
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            post_like: true,
          },
        },
      },
    });

    //return posts;

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
