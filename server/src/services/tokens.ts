import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { JwtPayload, UserRole } from "../types/auth.js";

export function signAccessToken(userId: string, role: UserRole) {
  const payload: JwtPayload = { sub: userId, role };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES_IN });
}

export function signRefreshToken(userId: string, role: UserRole) {
  const payload: JwtPayload = { sub: userId, role };
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
}

