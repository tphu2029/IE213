import express from "express";
import { API_v1 } from "./Routes/index.js";
import { connectDB } from "./Configs/mongodb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import "./Configs/googleAuth.js";
import { env } from "./Configs/environment.js";
import morgan from "morgan";
import helmet from "helmet";
import { globalRateLimit } from "./Middlewares/rateLimitMiddleware.js";

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  ...(env.FRONTEND_URL ? [env.FRONTEND_URL] : []),
];

const startServer = async () => {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        // Cho phép request không có origin (Postman, server-to-server)
        if (!origin) return callback(null, true);
        if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
        callback(new Error(`CORS blocked: ${origin}`));
      },
      credentials: true,
    }),
  );

  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use("/uploads", express.static("uploads"));
  app.use(passport.initialize());

  // Rate limiting toàn cục
  app.use(globalRateLimit);

  // Chống NoSQL injection — Express 5 compatible
  app.use((req, _res, next) => {
    const sanitize = (obj) => {
      if (!obj || typeof obj !== "object") return obj;
      for (const key of Object.keys(obj)) {
        if (key.startsWith("$") || key.includes(".")) {
          delete obj[key];
        } else if (typeof obj[key] === "object") {
          sanitize(obj[key]);
        }
      }
      return obj;
    };
    if (req.body) sanitize(req.body);
    if (req.params) sanitize(req.params);
    // Không đụng vào req.query vì Express 5 định nghĩa là getter-only
    next();
  });

  await connectDB();

  app.use("/api/v1", API_v1);

  app.get("/", (req, res) => {
    res.send("Welcome to the Hospital Statement API");
  });

  // Global Error Handler — phải đặt CUỐI CÙNG sau tất cả routes
  app.use((err, req, res, _next) => {
    console.error("🔥 Unhandled Error:", err.message || err);
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  });

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

startServer();

