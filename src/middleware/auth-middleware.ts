import type { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../error/error-response";
import { TokenUtils } from "../utils/token-utils";

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
    (req as any).currentUser = (decoded as any).data;
    // return res.status(200).json({
    //   decoded,
    // });
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
