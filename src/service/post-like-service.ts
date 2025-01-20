import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toPostLikeResponse,
  type PostLikeResponse,
} from "../model/post-like-model";

export class PostLikeService {
  static async storePostLike(
    postId: number,
    userId: number
  ): Promise<PostLikeResponse> {
    const [post_like] = await prisma.$transaction([
      prisma.post_like.create({
        data: {
          post_id: postId,
          user_id: userId,
        },
      }),
    ]);

    return toPostLikeResponse(post_like);
  }

  static async destroyPostLike(
    postId: number,
    userId: number
  ): Promise<PostLikeResponse> {
    const postLike = await prisma.post_like.findFirst({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });

    if (!postLike) {
      throw new ErrorResponse(404, "post like not found");
    }

    const [destroyPostLike] = await prisma.$transaction([
      prisma.post_like.delete({
        where: {
          id: postLike.id,
        },
      }),
    ]);

    return toPostLikeResponse(destroyPostLike);
  }
}
