import express from "express";
import passport from "passport";
import {
  register,
  login,
  googleCallback,
} from "../controllers/authController.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback
);

export default router;
