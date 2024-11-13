import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import type { CurrentUser } from "../model/auth-model";
import {
  toUserFollowResponse,
  type UserFollowRequest,
  type UserFollowResponse,
} from "../model/user-follow-model";
import { UserFollowValidation } from "../validation/user-follow-validation";
import { Validation } from "../validation/validation";

export class UserFollowService {
  static async storeUserFollow(
    request: UserFollowRequest,
    currentUser: CurrentUser
  ): Promise<UserFollowResponse> {
    const requestBody: UserFollowRequest = Validation.validate(
      UserFollowValidation.userFollowRequest,
      request
    );
    const isUserFollow = await prisma.user_follows.findFirst({
      where: {
        followed_user_id: requestBody.followed_user_id,
        follower_user_id: currentUser.id,
      },
    });

    if (isUserFollow) {
      throw new ErrorResponse(404, "user has been followed");
    }

    const [storedUserFollow] = await prisma.$transaction([
      prisma.user_follows.create({
        data: {
          followed_user_id: requestBody.followed_user_id,
          follower_user_id: currentUser.id,
        },
      }),
    ]);

    return toUserFollowResponse(storedUserFollow);
  }
}
