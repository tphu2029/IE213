import express from "express";
import passport from "passport";
import Session from "../Models/sessionModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const user = req.user;

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // lưu session vào DB
    await Session.create({
      userId: user._id,
      refreshToken,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  },
);

export const googleRoute = router;
