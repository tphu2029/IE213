import express from "express";
import { API_v1 } from "./Routes/index.js";
import { connectDB } from "./Configs/mongodb.js";
import cookieParser from "cookie-parser";

const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
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
