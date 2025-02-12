import express from "express";
import { isAuthencatedUser } from "../middlewares/auth";
import { addComment, getComments } from "../controllers/comment.controller";


const router = express.Router();

router.route("/comment").post(isAuthencatedUser,addComment);
router.route("/:postId/comments").get(getComments);


export default router;