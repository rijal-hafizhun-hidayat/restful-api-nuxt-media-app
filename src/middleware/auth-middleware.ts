import type { NextFunction, Request, Response } from "express";
import { TokenUtils } from "../utils/token-utils";
import { prisma } from "../app/database";
import type { CostumeRequest } from "../interface/request-interface";

export const authMiddleware = async (
  req: CostumeRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  // const authHeader = req.headers.authorization;
  const authToken = req.cookies.token;

  if (!authToken) {
    return res
      .status(403)
      .json({
        statusCode: 403,
        errors: "no token provided",
      })
      .end();
  }

  // const [, token] = authToken.split(" ");

  try {
    const decoded = await TokenUtils.verifyToken(authToken);
    const userId: number = (decoded as any).userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return res
        .status(403)
        .json({
          statusCode: 403,
          errors: "token invalid",
        })
        .end();
    }

    const formatUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      avatar: user.avatar
        ? `${process.env.BASE_URL}/storage/profile/${user.avatar}`
        : null,
      role: user.user_role.map((role) => role.role),
    };

    req.currentUser = formatUser;
    return next();
  } catch (error: any) {
    let errorMessage = "Token invalid";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Token expired";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Token malformed";
    }

    return res
      .status(403)
      .json({
        statusCode: 403,
        errors: errorMessage,
      })
      .end();
  }
};
