import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/Errors/globalErrorHandler";
import httpStatus from "http-status";
import router from "./app/Routes";
function createServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/v1", router);
  app.use(globalErrorHandler);
  app.use((req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Route not found",
      errorMessage: {
        path: req.originalUrl,
        message: "API endpoint not found",
      },
    });
  });
  return app;
}
export default createServer;
