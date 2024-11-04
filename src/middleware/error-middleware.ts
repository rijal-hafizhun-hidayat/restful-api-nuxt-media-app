import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorResponse } from "../error/error-response";
import { ErrorUtils } from "../utils/error-utils";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const formatedError = ErrorUtils.formatErrorZod(error);
    res.status(400).json({
      statusCode: 400,
      errors: formatedError,
    });
  } else if (error instanceof ErrorResponse) {
    res.status(error.status).json({
      statusCode: error.status,
      errors: error.message,
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      errors: error.message,
    });
  }
};
