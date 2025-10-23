import httpStatus from "http-status";
import CustomError from "../../Errors/CustomError";
import { TUser } from "./Auth.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Config from "../../Config";
import Teacher from "../Teacher/Teacher.model";
import User from "./Auth.model";
import Student from "../Student/Student.model";
import mongoose from "mongoose";
const LoginUser = async (payload: Pick<TUser, "email" | "password">) => {
  // console.log("from line 9 ", payload);
  // Checking If user exists or not
  const isUserExists = await User.findOne({ email: payload.email });
  if (!isUserExists) {
    throw new CustomError("User not found", httpStatus.NOT_FOUND);
  }
  // Check if password is correct
  const isPasswordMatched = bcrypt.compareSync(
    payload.password as string,
    isUserExists.password as string
  );
  if (!isPasswordMatched) {
    throw new CustomError("Invalid credentials", httpStatus.UNAUTHORIZED);
  }
  const tokenPayload = {
    id: isUserExists?._id,
    email: isUserExists?.email,
    name: isUserExists?.name,
    role: isUserExists?.role,
  };
  // console.log(tokenPayload);
  // Access and refresh  token generate
  const accessToken = jwt.sign(
    tokenPayload,
    "VGhpcy1pcy1hLWR1bW15LXJlZnJlc2gtc2VjcmV0",
    {
      expiresIn: "1d",
    }
  );
  const refreshToken = jwt.sign(
    tokenPayload,
    "VGhpcy1pcy1hLWR1bW15LXJlZnJlc2gtc2VjcmV0", // base64 for "This-is-a-dummy-refresh-secret"
    {
      expiresIn: "365d",
    }
  );
  const decodedData = jwt.decode(accessToken);
  // // const decodedData2 = jwt.decode(refreshToken);
  // console.log({ decodedData });
  // // console.log("from service", isUserExists.toObject());
  return { accessToken, refreshToken };
};

const RegisterUser = async (
  payload: Pick<
    TUser,
    "name" | "email" | "password" | "provider" | "googleAccessToken"
  >
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const isUserExists = await User.findOne({ email: payload.email });
    if (isUserExists) {
      throw new CustomError("User already exists", httpStatus.CONFLICT);
    }
    let hashedPassword;
    let res;
    if (payload.password) {
      hashedPassword = bcrypt.hashSync(payload.password as string, 10);
      // Create User
      res = await User.create({
        ...payload,
        role: "student",
        password: hashedPassword,
      });
      if (!res) {
        throw new CustomError("Forbidden", httpStatus.FORBIDDEN);
      }
      // Create student
      const studentRes = await Student.create({
        ...payload,
        user: res._id,
        password: hashedPassword,
      });
      if (!studentRes) {
        throw new CustomError("Forbidden", httpStatus.FORBIDDEN);
      }
    } else {
      if (payload.provider === "google") {
        const teacherUser = await User.create({
          ...payload,
          role: "teacher",
        });
        res = await Teacher.create({
          ...payload,
          user: teacherUser._id,
          googleAccessToken: payload.googleAccessToken,
        });
      } else {
        res = await User.create({
          ...payload,
          password: undefined,
        });
      }
    }
    await session.commitTransaction();
    return { ...res.toObject(), password: "" };
  } catch (error) {
    console.log(error);
    throw new CustomError("Failed to register", httpStatus.FORBIDDEN);
  } finally {
    await session.endSession();
  }
};

const FindUser = async ({
  email,
  name,
  provider,
  googleAccessToken,
}: {
  email: string;
  name: string;
  provider?: string;
  googleAccessToken?: string;
}) => {
  console.log("email", email);
  const isUserExists = await Teacher.findOne({ email });
  if (!isUserExists) {
    const result = await RegisterUser({
      email,
      name,
      provider,
      googleAccessToken,
    });
    console.log("result", result);
    return result;
  } else {
    isUserExists.googleAccessToken = googleAccessToken;
    await isUserExists.save();
    return isUserExists;
  }
};
export const AuthServices = {
  LoginUser,
  RegisterUser,
  FindUser,
};
