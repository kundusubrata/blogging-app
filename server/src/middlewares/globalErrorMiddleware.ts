import { Request, Response, NextFunction } from "express";
import CustomErrorHandler from "../utils/customErrorHandler";


export const globalErrorMiddleware = (
  err: CustomErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  };

  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err?.stack,
  });
};
