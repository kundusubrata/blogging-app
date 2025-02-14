import express from "express";
import { addComment, getComments } from "../controllers/comment.controller";
import { isAuthenticatedUser } from "../middlewares/auth";


const router = express.Router();

router.route("/comment").post(isAuthenticatedUser,addComment);
router.route("/:postId/comments").get(getComments);


export default router;