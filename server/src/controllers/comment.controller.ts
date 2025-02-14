import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { asyncHandler } from "../middlewares/asyncHandler";
import CustomErrorHandler from "../utils/customErrorHandler";


// Add Comment  ===>>>> /api/v1/comment
export const addComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {postId , content} = req.body;
    const userId = req.userId;

    if (!userId) {
      return next(new CustomErrorHandler("User not authenticated", 401));
    }

    const existingComments = await prisma.comment.count({
      where: {
        authorId: userId,
        postId,
      },
    });
    
    if (existingComments >= 1) { 
      return next(new CustomErrorHandler("You can only comment 1 times per post", 400));
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
    const postId = req.params.postId;

    if(!postId) {
      return next(new CustomErrorHandler("Post not found", 404));
    }

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