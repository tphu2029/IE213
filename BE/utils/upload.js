import multer from "multer";
import path from "path";
import fs from "fs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Chỉ cho phép đúng các MIME type hình ảnh phổ biến
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname).toLowerCase());
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  // Kiểm tra cả MIME type và extension
  if (ALLOWED_MIME_TYPES.includes(file.mimetype) && ALLOWED_EXTENSIONS.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(`Chỉ cho phép tải lên hình ảnh (${ALLOWED_EXTENSIONS.join(", ")}), tối đa ${MAX_FILE_SIZE / 1024 / 1024}MB!`),
      false,
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1, // Tối đa 1 file mỗi request
  },
});

