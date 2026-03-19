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

const startServer = async () => {
  const app = express();

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());
  app.use(passport.initialize());
  await connectDB();

  app.use("/api/v1", API_v1);

  app.get("/", (req, res) => {
    res.send("Welcome to the Hospital Statement API");
  });

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

startServer();
