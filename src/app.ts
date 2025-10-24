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

app.use(globalErrorHandler);
app.use(async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: "Route not found",
    errorMessage: {
      path: req.originalUrl,
      message: "API Not Found",
    },
  });
});
export default app;
