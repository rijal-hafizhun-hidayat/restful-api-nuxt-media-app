import type { NextFunction, Request, Response } from "express";
import { UserUtils } from "../utils/user-utils";

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const role = (req as any).currentUser.role[0].name;
  const compareRole: boolean = await UserUtils.compareRole(role, "user");

  if (compareRole === true) {
    return next();
  }

  return res.status(401).json({
    statusCode: 401,
    errors: "unauthorized",
  });
};
