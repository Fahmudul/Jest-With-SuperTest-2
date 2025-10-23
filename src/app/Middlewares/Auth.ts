import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import CustomError from "../Errors/CustomError";
import catchAsync from "../Utils/catchAsync";
import User from "../Modules/Auth/Auth.model";

export const AuthGurd = (...roles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    console.log("token", token);
    if (!token) {
      throw new CustomError("Unauthorized", httpStatus.UNAUTHORIZED);
    }
    const decodedData = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;
    console.log("decoded data", decodedData);
    // Get user
    const user = await User.findById(decodedData.id);
    if (
      !roles.includes(decodedData.role as string) ||
      user?.role !== decodedData.role
    ) {
      throw new CustomError("Unauthorized", httpStatus.UNAUTHORIZED);
    }

    next();
  });
};
