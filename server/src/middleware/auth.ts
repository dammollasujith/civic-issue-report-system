import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../services/tokens.js";
import { HttpError } from "../utils/httpError.js";
import type { UserRole } from "../types/auth.js";

declare global {
  // eslint-disable-next-line no-var
  var __auth: unknown;
}

declare module "express-serve-static-core" {
  interface Request {
    auth?: { userId: string; role: UserRole };
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const bearer = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;
  const token = bearer ?? req.cookies?.accessToken;
  if (!token) throw new HttpError(401, "Unauthorized");
  try {
    const payload = verifyAccessToken(token);
    req.auth = { userId: payload.sub, role: payload.role };
    next();
  } catch {
    throw new HttpError(401, "Unauthorized");
  }
}

export function requireRole(roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth) throw new HttpError(401, "Unauthorized");
    if (!roles.includes(req.auth.role)) throw new HttpError(403, "Forbidden");
    next();
  };
}

