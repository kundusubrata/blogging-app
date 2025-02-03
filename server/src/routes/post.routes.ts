import express from "express";
import { isAuthencatedUser } from "../middlewares/auth";
import { bulkPost, createPost, deletePost, editPost, getPosts, getSinglePost } from "../controllers/post.controller";

const router = express.Router();

router.route("/bulkpost").post(isAuthencatedUser,bulkPost);
router.route("/createpost").post(isAuthencatedUser,createPost);
router.route("/getposts").get(getPosts);
router.route("/getpost/:id").get(getSinglePost);
router.route("/editpost/:id").put(isAuthencatedUser,editPost);
router.route("/deletepost/:id").delete(isAuthencatedUser,deletePost)

export default router;