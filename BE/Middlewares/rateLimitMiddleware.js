import rateLimit from "express-rate-limit";

// Giới hạn đăng nhập: 10 lần / 15 phút
export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau 15 phút.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

// Giới hạn đăng ký: 5 tài khoản / 1 giờ từ cùng IP
export const registerRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Quá nhiều lần đăng ký từ địa chỉ này. Vui lòng thử lại sau 1 giờ.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Giới hạn chung cho API
export const globalRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Quá nhiều request. Vui lòng thử lại sau.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
