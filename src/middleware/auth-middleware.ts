import type { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../error/error-response";
import { TokenUtils } from "../utils/token-utils";
import { prisma } from "../app/database";
import type { role } from "@prisma/client";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(403)
      .json({
        statusCode: 403,
        errors: "no token provided",
      })
      .end();
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await TokenUtils.verifyToken(token);
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
      avatar: (Bun.env.BASE_URL as string) + "/storage/profile/" + user.avatar,
      role: user.user_role.map((role) => role.role),
    };

    (req as any).currentUser = formatUser;
    return next();
  } catch (error: any) {
    return res
      .status(403)
      .json({
        statusCode: 403,
        errors: error.message,
      })
      .end();
  }
};
