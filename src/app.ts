import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import router from "./app/Routes";
// import dotenv from "dotenv";
import globalErrorHandler from "./app/Errors/globalErrorHandler";
// dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://pulse-edu-verse.vercel.app"],
  })
);
app.use("/api/v1", router);
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello from Express");
});
app.use(globalErrorHandler);
export default app;
