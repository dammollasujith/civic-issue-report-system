import mongoose, { Schema } from "mongoose";
import type { UserRole } from "../types/auth.js";

export type UserDoc = mongoose.InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
  role: UserRole;
};

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String },
    role: { type: String, enum: ["citizen", "admin"], required: true, default: "citizen", index: true },
    avatarUrl: { type: String },
    address: { type: String },
    isBlocked: { type: Boolean, default: false, index: true },

    googleId: { type: String, index: true, sparse: true },

    resetPasswordTokenHash: { type: String },
    resetPasswordExpiresAt: { type: Date }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);

