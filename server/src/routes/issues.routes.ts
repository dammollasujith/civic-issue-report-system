import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  adminUpdateIssue,
  createIssue,
  getIssue,
  listIssues,
  myIssues,
  upvoteIssue
} from "../controllers/issues.controller.js";

export const issuesRouter = Router();

issuesRouter.get("/", asyncHandler(listIssues));

issuesRouter.post("/", requireAuth, upload.array("media", 6), asyncHandler(createIssue));
issuesRouter.get("/me/list", requireAuth, asyncHandler(myIssues));
issuesRouter.post("/:id/upvote", requireAuth, asyncHandler(upvoteIssue));

issuesRouter.patch("/:id/admin", requireAuth, requireRole(["admin"]), asyncHandler(adminUpdateIssue));

issuesRouter.get("/:id", asyncHandler(getIssue));

