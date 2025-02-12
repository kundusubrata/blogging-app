import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "./asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomErrorHandler from "../utils/customErrorHandler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

// User Authorizes Role
export const authorizeRoles = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { role: true },
      });

      if (!user) {
        return next(new CustomErrorHandler("User not found", 404));
      }

      if (!roles.includes(user.role)) {
        return next(
          new CustomErrorHandler(
            `Role (${user.role}) is not allowed to access this resource`,
            403
          )
        );
      }

      next();
    } catch (error) {
      next(new CustomErrorHandler("Authorization error", 500));
    }
  };
};
