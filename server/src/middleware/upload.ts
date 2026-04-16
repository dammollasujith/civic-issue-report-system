import path from "path";
import fs from "fs";
import multer from "multer";

const tmpDir = path.join(process.cwd(), ".tmp");
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, tmpDir),
    filename: (_req, file, cb) => {
      const safe = file.originalname.replaceAll(" ", "_").replaceAll(/[^a-zA-Z0-9._-]/g, "");
      cb(null, `${Date.now()}-${safe}`);
    }
  }),
  limits: { fileSize: 15 * 1024 * 1024, files: 6 }
});

