import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { adminBlockUser, adminSummary, adminTrends, adminUsers } from "../controllers/admin.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole(["admin"]));

adminRouter.get("/summary", asyncHandler(adminSummary));
adminRouter.get("/trends", asyncHandler(adminTrends));
adminRouter.get("/users", asyncHandler(adminUsers));
adminRouter.patch("/users/:id/block", asyncHandler(adminBlockUser));

