import mongoose, { Schema } from "mongoose";

export type IssueStatus = "pending" | "reviewed" | "assigned" | "in_progress" | "resolved" | "rejected";
export type IssueSeverity = "low" | "medium" | "high" | "critical";
export type IssueCategory =
  | "roads"
  | "garbage"
  | "water_leakage"
  | "drainage"
  | "streetlight"
  | "traffic_signal"
  | "illegal_parking"
  | "sanitation"
  | "public_safety"
  | "others";

const issueSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, index: "text" },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        "roads",
        "garbage",
        "water_leakage",
        "drainage",
        "streetlight",
        "traffic_signal",
        "illegal_parking",
        "sanitation",
        "public_safety",
        "others"
      ],
      required: true,
      index: true
    },
    severity: { type: String, enum: ["low", "medium", "high", "critical"], required: true, index: true },
    status: {
      type: String,
      enum: ["pending", "reviewed", "assigned", "in_progress", "resolved", "rejected"],
      required: true,
      default: "pending",
      index: true
    },
    isAnonymous: { type: Boolean, default: false, index: true },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    address: { type: String, trim: true },
    landmark: { type: String, trim: true },
    ward: { type: String, trim: true, index: true },

    media: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
        kind: { type: String, enum: ["image", "video"], required: true }
      }
    ],

    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },

    upvoteCount: { type: Number, default: 0, index: true },
    upvotedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],

    assignedDepartment: {
      type: String,
      enum: ["roads", "water", "sanitation", "electrical", "traffic", "other"],
      default: "other",
      index: true
    },
    assignedStaffName: { type: String, trim: true },
    expectedCompletionDate: { type: Date },

    adminNotes: { type: String, trim: true },
    resolvedAt: { type: Date }
  },
  { timestamps: true }
);

issueSchema.index({ location: "2dsphere" });

export const IssueModel = mongoose.model("Issue", issueSchema);

