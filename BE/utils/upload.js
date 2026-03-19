import multer from "multer";
import path from "path";

// Cấu hình nơi lưu file và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Lưu vào thư mục 'uploads' ở server
  },
  filename: function (req, file, cb) {
    // Tạo tên file duy nhất: thời-gian-hiện-tại-tên-gốc.jpg
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Chỉ cho phép upload file ảnh
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép tải lên hình ảnh!"), false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
