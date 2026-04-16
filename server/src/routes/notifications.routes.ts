import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listNotifications, markAllRead } from "../controllers/notifications.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const notificationsRouter = Router();

notificationsRouter.get("/", requireAuth, asyncHandler(listNotifications));
notificationsRouter.post("/read-all", requireAuth, asyncHandler(markAllRead));

