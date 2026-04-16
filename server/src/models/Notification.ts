import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    kind: {
      type: String,
      enum: ["issue_created", "status_changed", "comment", "nearby_alert", "system"],
      default: "system",
      index: true
    },
    readAt: { type: Date },
    meta: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model("Notification", notificationSchema);

