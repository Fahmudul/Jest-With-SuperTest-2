import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { AuthServices } from "./Auth.services";

const LoginUser = catchAsync(async (req, res) => {
  // console.log(req.body);
  const response = await AuthServices.LoginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " User logged in successfully",
    success: true,
    data: response,
  });
});
const RegisterUser = catchAsync(async (req, res) => {
  const response = await AuthServices.RegisterUser(req.body);
  console.log("user hitting");
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " User registered successfully",
    success: true,
    data: response,
  });
});
const FindUser = catchAsync(async (req, res) => {
  // const { email } = req.query;
  console.log(req.body);

  const response = await AuthServices.FindUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " User created successfully",
    success: true,
    data: response,
  });
});
export const AuthControllers = {
  LoginUser,
  RegisterUser,
  FindUser,
};
