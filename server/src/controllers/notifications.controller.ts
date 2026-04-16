import type { Request, Response } from "express";
import { z } from "zod";
import { HttpError } from "../utils/httpError.js";
import { prisma } from "../config/prisma.js";

export async function listNotifications(req: Request, res: Response) {
  if (!req.auth) throw new HttpError(401, "Unauthorized");
  const page = z.coerce.number().default(1).parse(req.query.page);
  const limit = Math.min(50, z.coerce.number().default(20).parse(req.query.limit));

  const [items, total, unread] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: req.auth.userId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.notification.count({ where: { userId: req.auth.userId } }),
    prisma.notification.count({ where: { userId: req.auth.userId, readAt: null } })
  ]);

  return res.json({ ok: true, items, total, unread, page, limit });
}

export async function markAllRead(req: Request, res: Response) {
  if (!req.auth) throw new HttpError(401, "Unauthorized");
  await prisma.notification.updateMany({
    where: { userId: req.auth.userId, readAt: null },
    data: { readAt: new Date() }
  });
  return res.json({ ok: true });
}

