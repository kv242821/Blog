import express from "express";
import {
  addUserinterests,
  deleteUser,
  editUser,
  followUser,
  getAllFollowers,
  getAllFollowings,
  getAllList,
  getNotifications,
  getUser,
  getUserinterests,
  removeUserinterests,
  suggestUsers,
  unfollowUser,
} from "../controllers/user.controller";

import isAuthenticated from "../middlewares/auth";
const router = express.Router();

router
  .route("/myprofile")
  .put(isAuthenticated, editUser)
  .delete(isAuthenticated, deleteUser);

router.route("/suggest").get(isAuthenticated, suggestUsers);

router.route("/notifications").get(isAuthenticated, getNotifications);

router
  .route("/interests")
  .get(isAuthenticated, getUserinterests)
  .patch(isAuthenticated, addUserinterests)
  .delete(isAuthenticated, removeUserinterests);

router.route("/list").get(isAuthenticated, getAllList);

router.route("/:userId").get(getUser);

router.route("/followers/:userId").get(getAllFollowers);

router.route("/followings/:userId").get(getAllFollowings);

router.route("/follow/:userId").put(isAuthenticated, followUser);

router.route("/unfollow/:userId").put(isAuthenticated, unfollowUser);

export default router;
