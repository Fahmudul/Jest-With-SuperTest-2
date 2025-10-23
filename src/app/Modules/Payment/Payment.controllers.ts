import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { PaymentServices } from "./Paymen.services";

const createCheckOutSession = catchAsync(async (req, res) => {
  const response = await PaymentServices.CreateCheckOutSession(req.body.price);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Client Secret Retrieved Successfully",
    data: response,
  });
});
const ConfirmPayment = catchAsync(async (req, res) => {
  const response = await PaymentServices.ConfirmPayment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment successfull... 😎",
    data: response,
  });
});

export const getAllPayment = catchAsync(async (req, res) => {
  const response = await PaymentServices.getAllPayment(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment Retrieved... 😎",
    data: response,
  });
});

export const PayemntController = {
  createCheckOutSession,
  ConfirmPayment,
  getAllPayment,
};
