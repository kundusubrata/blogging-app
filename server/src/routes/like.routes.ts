import express from "express";
import { toggleLike } from "../controllers/like.controller";
import { isAuthenticatedUser } from "../middlewares/auth";

const router = express.Router();

router.route("/like").post(isAuthenticatedUser,toggleLike);


export default router;