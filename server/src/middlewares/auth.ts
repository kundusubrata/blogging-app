import express, { Request, Response, NextFunction } from "express";
import { asyncHandler } from "./asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomErrorHandler from "../utils/customErrorHandler";



export const isAuthencatedUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new CustomErrorHandler("Login first to access the resource", 401)
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    // console.log(decoded);
    if (!decoded || !decoded.userId) {
      return next(new CustomErrorHandler("Invalid token", 401));
    }

    req.userId = decoded.userId;
    next();
  }
);
