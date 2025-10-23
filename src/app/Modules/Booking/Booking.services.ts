import httpStatus from "http-status";
import CustomError from "../../Errors/CustomError";
import { IBooking, TScheduleItem } from "./Booking.interface";

import Teacher from "../Teacher/Teacher.model";
import Booking from "./Booking.model";
import Subject from "../Subject/Subject.model";
import { IAvailability } from "../Teacher/Teacher.interface";
import { formatDate } from "./Booking.utils";

const CreateBookingRequest = async (payload: IBooking) => {
  console.log("Booking payload", payload);
  const { teacher, subject, student } = payload;
  console.log({ teacher, subject, student });
  // Subject exist
  const isSubjectExist = await Subject.findById(subject);
  if (!isSubjectExist) {
    throw new CustomError("Subject not exists", httpStatus.NOT_FOUND);
  }
  const isTeacherExist = await Teacher.findById(teacher);

  if (!isTeacherExist) {
    throw new CustomError("Teacher not found", httpStatus.NOT_FOUND);
  }

  const res = await Booking.create(payload);
  return res;
};

const AcceptBookingRequest = async (id: string, status: string) => {
  const res = await Booking.findByIdAndUpdate(id, {
    status: status === "Accepted" ? "In progress" : "Cancelled",
    payBtn: true,
  });

  return res;
};
const GetAllBooking = async (id: string) => {
  console.log("iddd", id);
  const res = await Booking.find({ teacher: id })
    .populate("teacher subject")
    .populate("student")
    .select("-password");
  return res;
};
const GetSingleBooking = async (id: string) => {
  console.log("single id", id);
  let res = await Booking.findOne({
    student: id,
    $or: [{ status: "Pending" }, { status: "In progress" }],
  }).populate("subject teacher student");
  const newRes = res?.toObject() as any;
  console.log("current shape", res);
  const schedule: TScheduleItem[] = [];
  if (newRes?.schedule) {
    Object.keys(newRes.schedule).map((day) => {
      schedule.push({
        day: day.charAt(0).toUpperCase() + day.slice(1),
        startTime: newRes?.schedule[day].startTime,
        endTime: newRes?.schedule[day].endTime,
      });
    });
  }
  const startDate = newRes?.event.start.dateTime.split("T")[0];
  const timeStamp = newRes?.event.recurrence[0].split(";")[2].split("=")[1];
  const endDate = formatDate(timeStamp!);
  // console.log("time stamp", newRes?.teacher.hourlyRate);
  const modifiedResponse = {
    bookingId: newRes?._id,
    subject: {
      name: newRes?.subject.name,
      imageUrl:
        "https://www.mathnasium.com/storage/app/uploads/public/669/a5a/fee/669a5afee3189617484713.png",
    },
    schedule,
    teacher: newRes?.teacher.name,
    duration: {
      startDate,
      endDate,
    },
    price: newRes?.duration! * parseFloat(newRes?.teacher?.hourlyRate),
    totalSessions: 12,
    status: newRes?.status,
    payBtn: newRes?.payBtn,
  };
  console.log("modified response", modifiedResponse);
  return modifiedResponse;
};
export const BookingServices = {
  CreateBookingRequest,
  GetAllBooking,
  GetSingleBooking,
  AcceptBookingRequest,
};
