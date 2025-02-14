import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { asyncHandler } from "../middlewares/asyncHandler";
import { posts } from "../seeder/data";
import CustomErrorHandler from "../utils/customErrorHandler";
import { createPostBody, editPostBody } from "../utils/zodValidations";

// Create new post  ===>>>> /api/v1/createpost
export const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      return next(new CustomErrorHandler("User not authenticated", 401));
    }

    const { success, data } = createPostBody.safeParse(req.body);
    if (!success) {
      return next(new CustomErrorHandler("Invalid input", 400));
    }

    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: userId,
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

    res.status(201).json({
      success: true,
      post,
    });
  }
);

// Get all posts  ===>>>> /api/v1/getposts
export const getPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search = "", page = 1, limit = 5 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // fetch the actual posts that match the search
    const posts = await prisma.post.findMany({
      where: {
        title: {
          contains: search as string,
          mode: "insensitive",
        },
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
      skip,
      take: limitNumber,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Only to count post that match the search
    const totalPosts = await prisma.post.count({
      where: {
        title: {
          contains: search as string,
          mode: "insensitive",
        },
      },
    });

    res.status(200).json({
      success: true,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limitNumber),
      currentPage: pageNumber,
      posts,
    });
  }
);

// Get single post  ===>>>> /api/v1/getpost/:id
export const getSinglePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        comments: true,
        likes: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!post) {
      return next(new CustomErrorHandler("Post not found", 404));
    }

    res.status(200).json({
      success: true,
      post,
    });
  }
);

// Get My Posts  ===>>>> /api/v1/getmyposts
export const myPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      return next(new CustomErrorHandler("User not authenticated", 401));
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: true,
      },
    });

    res.status(200).json({
      success: true,
      posts,
    });
  }
);

// Edit post  ===>>>> /api/v1/editpost/:id
export const editPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { success, data } = editPostBody.safeParse(req.body);
    if (!success) {
      return next(new CustomErrorHandler("Invalid input", 400));
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
      },
    });

    if (!post) {
      return next(new CustomErrorHandler("Post not found", 404));
    }

    res.status(200).json({
      success: true,
      post,
    });
  }
);

// Delete Post  ===>>>> /api/v1/deletepost/:id
export const deletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return next(new CustomErrorHandler("Post not found", 404));
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  }
);

// Admin all Posts   ====>>>> /api/v1/admin/allposts
export const adminAllPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await prisma.post.findMany();

    res.status(200).json({
      success: true,
      posts,
    });
  }
);
