import express from "express";
import passport from "passport";
import { authService } from "../Services/authService.js";
import { setAuthCookies } from "../utils/authCookies.js";

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
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Google authentication failed" });
      }

      const result = await authService.completeOAuthLogin(req.user);

      setAuthCookies(res, {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });

      res.json({
        message: "User logged in successfully",
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error) {
      console.error("google callback error", error);
      return res.status(500).json({
        message: "Error completing Google login",
        error: error.message,
      });
    }
  },
);

export const googleRoute = router;
