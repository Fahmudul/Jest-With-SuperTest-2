import mongoose, { Schema, model } from "mongoose";
import { IPayment } from "./Payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    student: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    courseName: {
      type: String,
      required: true,
      ref: "Subject",
    },
    method: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Bookings",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Payments",
  }
);

const Payment = model<IPayment>("Payments", paymentSchema);

export default Payment;
