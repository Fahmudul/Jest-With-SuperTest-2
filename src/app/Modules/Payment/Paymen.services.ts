import Stripe from "stripe";
import Teacher from "../Teacher/Teacher.model";
import CustomError from "../../Errors/CustomError";
import Booking from "../Booking/Booking.model";
import httpStatus from "http-status";
import mongoose from "mongoose";
import Payment from "./Payment.model";
import Student from "../Student/Student.model";
import { sendMail } from "../../Utils/sendMail";
import { IPaymentPayload } from "./Payment.interface";
import User from "../Auth/Auth.model";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10; custom_checkout_beta=v1" as any,
});

const CreateCheckOutSession = async (price: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(price) * 1000,
    currency: "bdt",
    payment_method_types: ["card"],
  });
  // console.log("client secret", paymentIntent);
  return { clientSecret: paymentIntent.client_secret };
};

const ConfirmPayment = async (payload: IPaymentPayload) => {
  console.log("payment payload", payload);
  const existingBooking = await Booking.findById(payload.bookingId);
  if (!existingBooking) {
    throw new CustomError("Booking not found", httpStatus.NOT_FOUND);
  }
  const foundTeacher = await Teacher.findById(existingBooking.teacher);
  // console.log("access token", foundTeacher);
  const student = await User.findById(payload.student);
  console.log("student", student);
  const sendMailPayload = {
    name: payload?.studentName,
    paymentId: payload.paymentId,
    price: payload.price,
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    courseName: payload.courseName,
    websiteUrl: process.env.WEBSITE_URL,
    teacher: payload.teacher,
    email: student?.email,
  };
  const session = await mongoose.startSession();
  // console.log("mail payload", sendMailPayload);
  try {
    session.startTransaction();
    // Create a schedule in teacher's google calendar
    const bookedSession = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${foundTeacher?.googleAccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(existingBooking.event),
      }
    );
    const bookedSessionResult = await bookedSession.json();
    if (!bookedSessionResult) {
      throw new CustomError("Failed to book session", httpStatus.BAD_GATEWAY);
    }

    const sendMailSuccess = await sendMail(sendMailPayload);
    if (!sendMailSuccess) {
      throw new CustomError(
        "Faile to send confirmation mail.",
        httpStatus.BAD_REQUEST
      );
    }

    console.log("session  result", bookedSessionResult);
    // Update booking session status
    existingBooking.status = "Accepted";
    const result = await existingBooking.save();
    if (!result) {
      throw new CustomError("Failed to update status", httpStatus.NOT_MODIFIED);
    }
    // Create payment history

    const res = await Payment.create({
      ...payload,
      teacher: existingBooking.teacher,
    });
    if (!res) {
      throw new CustomError("Payment failed", httpStatus.BAD_REQUEST);
    }

    // Update Teacher balance
    const teacherBalance = await Teacher.findOneAndUpdate(
      { _id: existingBooking.teacher },
      { $inc: { balance: payload.price } },
      { new: true }
    );
    if (!teacherBalance) {
      throw new CustomError(
        "Failed to update teacher balance",
        httpStatus.NOT_MODIFIED
      );
    }

    await session.commitTransaction();
    return res;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    if (error instanceof CustomError)
      throw new CustomError(error.message, httpStatus.BAD_REQUEST);
  } finally {
    await session.endSession();
  }
};

export const getAllPayment = async (id: string) => {
  console.log("id from service", id);
  const student = await Student.findOne({ user: id });
  const res = await Payment.find({ student: id }).select(
    "currency price paymentId method courseName createdAt"
  );
  return res;
};
export const PaymentServices = {
  CreateCheckOutSession,
  ConfirmPayment,
  getAllPayment,
};
