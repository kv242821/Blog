import express from "express";
import {
  googleAuth,
  logout,
  tokenRefresh,
} from "../controllers/auth.controller";
const router = express.Router();

router.route("/google/oauth").get(googleAuth);

router.route("/token").post(tokenRefresh);

router.route("/logout").post(logout);


export default router;
