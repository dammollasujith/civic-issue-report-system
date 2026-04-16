import { Router } from "express";
import passport from "passport";
import { env } from "../config/env.js";
import { requireAuth } from "../middleware/auth.js";
import { signup, login, refresh, logout, me, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { configureGoogleAuth } from "../services/googleAuth.js";
import { signAccessToken, signRefreshToken } from "../services/tokens.js";

configureGoogleAuth();

export const authRouter = Router();

authRouter.post("/signup", asyncHandler(signup));
authRouter.post("/login", asyncHandler(login));
authRouter.post("/refresh", asyncHandler(refresh));
authRouter.post("/logout", asyncHandler(logout));
authRouter.get("/me", requireAuth, asyncHandler(me));
authRouter.post("/forgot-password", asyncHandler(forgotPassword));
authRouter.post("/reset-password", asyncHandler(resetPassword));

if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.GOOGLE_CALLBACK_URL) {
  authRouter.get(
    "/google",
    passport.authenticate("google", { session: false, scope: ["profile", "email"] })
  );

  authRouter.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: `${env.CLIENT_URL}/auth/citizen/login` }),
    (req, res) => {
      const user = req.user as { _id: unknown; role: "citizen" | "admin" };
      const userId = String((user as any)._id);
      const accessToken = signAccessToken(userId, user.role);
      const refreshToken = signRefreshToken(userId, user.role);
      const isProd = env.NODE_ENV === "production";

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/"
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/api/auth/refresh"
      });

      res.redirect(`${env.CLIENT_URL}/portal`);
    }
  );
}

