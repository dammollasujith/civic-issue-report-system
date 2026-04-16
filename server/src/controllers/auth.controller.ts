import crypto from "crypto";
import type { Request, Response } from "express";
import { z } from "zod";
import { HttpError } from "../utils/httpError.js";
import { hashPassword, verifyPassword } from "../services/passwords.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../services/tokens.js";
import { sendMail } from "../services/email.js";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";

const signupSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(200),
  phone: z.string().optional(),
  role: z.enum(["citizen", "admin"]).optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(["citizen", "admin"]).optional()
});

function cookieOpts() {
  const isProd = env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/"
  };
}

export async function signup(req: Request, res: Response) {
  const body = signupSchema.parse(req.body);
  const existing = await prisma.user.findUnique({ where: { email: body.email } });
  if (existing) throw new HttpError(409, "Email already in use");

  const passwordHash = await hashPassword(body.password);
  const role = body.role ?? "citizen";

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      passwordHash,
      role
    }
  });

  const accessToken = signAccessToken(user.id, role);
  const refreshToken = signRefreshToken(user.id, role);
  res.cookie("accessToken", accessToken, cookieOpts());
  res.cookie("refreshToken", refreshToken, { ...cookieOpts(), path: "/api/auth/refresh" });

  return res.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

export async function login(req: Request, res: Response) {
  const body = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user) throw new HttpError(401, "Invalid credentials");
  if (user.isBlocked) throw new HttpError(403, "Account blocked");
  if (!user.passwordHash) throw new HttpError(401, "Use Google login for this account");

  const ok = await verifyPassword(body.password, user.passwordHash);
  if (!ok) throw new HttpError(401, "Invalid credentials");

  if (body.role && user.role !== body.role) throw new HttpError(403, "Role mismatch");

  const accessToken = signAccessToken(user.id, user.role);
  const refreshToken = signRefreshToken(user.id, user.role);
  res.cookie("accessToken", accessToken, cookieOpts());
  res.cookie("refreshToken", refreshToken, { ...cookieOpts(), path: "/api/auth/refresh" });

  return res.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.refreshToken;
  if (!token) throw new HttpError(401, "Unauthorized");
  const payload = verifyRefreshToken(token);

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user || user.isBlocked) throw new HttpError(401, "Unauthorized");

  const accessToken = signAccessToken(user.id, user.role);
  res.cookie("accessToken", accessToken, cookieOpts());
  return res.json({ ok: true });
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("accessToken", cookieOpts());
  res.clearCookie("refreshToken", { ...cookieOpts(), path: "/api/auth/refresh" });
  return res.json({ ok: true });
}

export async function me(req: Request, res: Response) {
  if (!req.auth) throw new HttpError(401, "Unauthorized");
  const user = await prisma.user.findUnique({
    where: { id: req.auth.userId },
    select: { id: true, name: true, email: true, role: true, avatarUrl: true, phone: true, address: true, isBlocked: true }
  });
  if (!user) throw new HttpError(401, "Unauthorized");
  if (user.isBlocked) throw new HttpError(403, "Account blocked");
  return res.json({ ok: true, user });
}

const forgotSchema = z.object({ email: z.string().email() });

export async function forgotPassword(req: Request, res: Response) {
  const { email } = forgotSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.json({ ok: true });

  const raw = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(raw).digest("hex");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetPasswordTokenHash: hash,
      resetPasswordExpiresAt: new Date(Date.now() + 1000 * 60 * 30)
    }
  });

  const resetUrl = `${env.CLIENT_URL}/auth/reset-password?token=${raw}&email=${encodeURIComponent(email)}`;
  await sendMail({
    to: email,
    subject: "Reset your Smart Civic password",
    html: `<p>Click to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
  });

  return res.json({ ok: true });
}

const resetSchema = z.object({
  email: z.string().email(),
  token: z.string().min(10),
  newPassword: z.string().min(8).max(200)
});

export async function resetPassword(req: Request, res: Response) {
  const body = resetSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user || !user.resetPasswordTokenHash || !user.resetPasswordExpiresAt) {
    throw new HttpError(400, "Invalid or expired reset token");
  }
  if (user.resetPasswordExpiresAt.getTime() < Date.now()) {
    throw new HttpError(400, "Invalid or expired reset token");
  }

  const hash = crypto.createHash("sha256").update(body.token).digest("hex");
  if (hash !== user.resetPasswordTokenHash) throw new HttpError(400, "Invalid or expired reset token");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await hashPassword(body.newPassword),
      resetPasswordTokenHash: null,
      resetPasswordExpiresAt: null
    }
  });

  return res.json({ ok: true });
}

