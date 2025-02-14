import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { asyncHandler } from "../middlewares/asyncHandler";
import CustomErrorHandler from "../utils/customErrorHandler";
import {
  signinBody,
  signupBody,
  updateProfileBody,
} from "../utils/zodValidations";


// Register new user  ===>>>> /api/v1/signup
export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, data } = signupBody.safeParse(req.body);
    if (!success) {
      // return res.status(400).json({ error: "Invalid input" });
      return next(new CustomErrorHandler("Invalid input", 400));
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      // return res.status(409).json({ error: "User already exists" });
      return next(new CustomErrorHandler("User already exists", 409));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstname: data.firstname,
        lastname: data.lastname,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: parseInt(process.env.JWT_EXPIRES_TIME || "86400", 10),
    });

    // return res.status(201).json({
    //   message: "User created successfully",
    //   token,
    //   user,
    // });

    const options = {
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES_TIME) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
  }
);

// Login existing user  ===>>>> /api/v1/signin
export const signin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, data } = signinBody.safeParse(req.body);

    if (!success) {
      // return res.status(400).json({ error: "Invalid Input" });
      return next(new CustomErrorHandler("Invalid Inputs", 401));
    }

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      // return res.status(401).json({ error: "Invalid Credentials" });
      return next(new CustomErrorHandler("Invalid credentials", 401));
    }

    const isPasswordValid = await bcrypt.compare(
      data?.password,
      user?.password
    );

    if (!isPasswordValid) {
      // return res.status(401).json({ error: "Invalid Credentials" });
      return next(new CustomErrorHandler("Invalid credentials", 401));
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: parseInt(process.env.JWT_EXPIRES_TIME || "86400", 10),
    });

    const options = {
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES_TIME) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
  }
);

// Logout existing user  ===>>>> /api/v1/signout
export const signout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({ message: "User logged out successfully" });
  }
);

// My Profile    =====>>> /api/v1/myprofile
export const myProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      return next(new CustomErrorHandler("User not authenticated", 401));
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return next(new CustomErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  }
);

// Update Profile    =====>>> /api/v1/updateprofile
export const updateProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      return next(new CustomErrorHandler("User not authenticated", 401));
    }

    const { success, data } = updateProfileBody.safeParse(req.body);

    if (!success) {
      return next(new CustomErrorHandler("Invalid input", 400));
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      },
    });

    if (!user) {
      return next(new CustomErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  }
);
