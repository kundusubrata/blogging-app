import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import CustomErrorHandler from "../utils/customErrorHandler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add Comment  ===>>>> /api/v1/comment
export const addComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {postId , content} = req.body;
    const userId = req.userId;

    if (!userId) {
      return next(new CustomErrorHandler("User not authenticated", 401));
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        postId
      },
      include: {
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      comment
    })
  }
);

// Get Comment for a post ===>>>> /api/v1/:postId/comments
export const getComments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;

    const comments = await prisma.comment.findMany({
      where: {
        postId
      },
      include: {
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      comments
    })
  }
)