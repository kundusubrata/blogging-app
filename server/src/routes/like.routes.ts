import express from "express";
import { isAuthencatedUser } from "../middlewares/auth";
import { toggleLike } from "../controllers/like.controller";

const router = express.Router();

router.route("/like").post(isAuthencatedUser,toggleLike);


export default router;