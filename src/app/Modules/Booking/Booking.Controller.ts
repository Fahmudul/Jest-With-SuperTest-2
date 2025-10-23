import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { BookingServices } from "./Booking.services";

const CreateBookingRequest = catchAsync(async (req, res) => {
  // console.log("booking controller", req.body);
  const response = await BookingServices.CreateBookingRequest(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " Booking request sent successfully",
    success: true,
    data: response,
  });
});
const AcceptBookingRequest = catchAsync(async (req, res) => {
  // console.log("booking controller", req.body);
  const response = await BookingServices.AcceptBookingRequest(
    req.params.id,
    req.query.status as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " Booking request accepted",
    success: true,
    data: response,
  });
});
const GetAllBooking = catchAsync(async (req, res) => {
  console.log("booking controller", req.params.teacherId);
  const response = await BookingServices.GetAllBooking(req.params.teacherId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " All Booking retrieve successfully",
    success: true,
    data: response,
  });
});
const GetSingleBooking = catchAsync(async (req, res) => {
  console.log("booking controller 1", req.params.id);
  const response = await BookingServices.GetSingleBooking(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " All Booking retrieve successfully",
    success: true,
    data: response,
  });
});

export const BookingControllers = {
  CreateBookingRequest,
  GetAllBooking,
  GetSingleBooking,
  AcceptBookingRequest,
};
