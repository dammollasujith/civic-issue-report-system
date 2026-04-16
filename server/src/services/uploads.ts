import path from "path";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

export type UploadedMedia = { url: string; publicId?: string; kind: "image" | "video" };

function cloudinaryConfigured() {
  return Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET);
}

if (cloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
  });
}

export async function persistUpload(file: Express.Multer.File): Promise<UploadedMedia> {
  const kind: UploadedMedia["kind"] = file.mimetype.startsWith("video/") ? "video" : "image";

  if (cloudinaryConfigured()) {
    const res = await cloudinary.uploader.upload(file.path, {
      resource_type: kind,
      folder: "smart-civic/issues"
    });
    return { url: res.secure_url, publicId: res.public_id, kind };
  }

  const uploadsDir = path.join(process.cwd(), env.UPLOADS_DIR);
  await fs.mkdir(uploadsDir, { recursive: true });
  const dest = path.join(uploadsDir, `${Date.now()}-${file.originalname}`.replaceAll(" ", "_"));
  await fs.copyFile(file.path, dest);
  return { url: `/uploads/${path.basename(dest)}`, kind };
}

