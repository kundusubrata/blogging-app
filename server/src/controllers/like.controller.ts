import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { asyncHandler } from "../middlewares/asyncHandler";
import CustomErrorHandler from "../utils/customErrorHandler";


// Like/Unlike Post  ===>>>> /api/v1/likepost/:id
export const toggleLike = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId }: { postId: string } = req.body;
    const userId = req.userId;


    if (!userId) {
      return next(new CustomErrorHandler("User not authenticated", 401));
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return res.status(200).json({
        success: true,
        message: "Unliked Post",
      });
    }
    await prisma.like.create({
      data: {
        postId: postId,
        userId: userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Liked Post",
    });
  }
);
