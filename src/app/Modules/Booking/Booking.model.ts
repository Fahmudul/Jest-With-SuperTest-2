import { Schema, model } from "mongoose";
import { IBooking } from "./Booking.interface";

const subjectSchema = new Schema<IBooking>(
  {
    student: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    teacher: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Teacher",
    },
    status: {
      type: String,
      default: "Pending",
    },

    event: {
      type: Object,
    },
    schedule: {
      type: Object,
    },

    subject: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Subject",
    },
    duration: {
      type: Number,
    },
    payBtn: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "Bookings",
  }
);

const Booking = model<IBooking>("Bookings", subjectSchema);

export default Booking;
