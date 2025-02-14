import express from "express";
import {
  adminAllPost,
  createPost,
  deletePost,
  editPost,
  getPosts,
  getSinglePost,
  myPosts
} from "../controllers/post.controller";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth";

const router = express.Router();


router.route("/createpost").post(isAuthenticatedUser, createPost);
router.route("/getposts").get(getPosts);
router.route("/getpost/:id").get(getSinglePost);
router.route("/getmyposts").get(isAuthenticatedUser, myPosts);
router.route("/editpost/:id").put(isAuthenticatedUser, editPost);
router.route("/deletepost/:id").delete(isAuthenticatedUser, deletePost);
router
  .route("/admin/allposts")
  .get(isAuthenticatedUser, authorizeRoles("ADMIN"), adminAllPost);

export default router;
