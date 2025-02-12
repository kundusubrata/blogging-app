import express from "express";
import { authorizeRoles, isAuthencatedUser } from "../middlewares/auth";
import {
  adminAllPost,
  bulkPost,
  createPost,
  deletePost,
  editPost,
  getPosts,
  getSinglePost,
  myPosts,
} from "../controllers/post.controller";

const router = express.Router();

router.route("/bulkpost").post(isAuthencatedUser, bulkPost);
router.route("/createpost").post(isAuthencatedUser, createPost);
router.route("/getposts").get(getPosts);
router.route("/getpost/:id").get(getSinglePost);
router.route("/getmyposts").get(isAuthencatedUser, myPosts);
router.route("/editpost/:id").put(isAuthencatedUser, editPost);
router.route("/deletepost/:id").delete(isAuthencatedUser, deletePost);
router
  .route("/admin/allposts")
  .get(isAuthencatedUser, authorizeRoles("ADMIN"), adminAllPost);

export default router;
