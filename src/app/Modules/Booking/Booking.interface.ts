import mongoose from "mongoose";
import { IAvailability } from "../Teacher/Teacher.interface";
export interface ISessionDetails {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  recurrence: string[];
  attendees: { email: string }[];
}
export interface IBooking {
  student: mongoose.Types.ObjectId;
  teacher: mongoose.Types.ObjectId;
  status: string;
  event: ISessionDetails;
  subject: mongoose.Types.ObjectId;
  duration: number;
  payBtn: boolean;
  schedule: IAvailability;
}
export type TScheduleItem = {
  day?: string;
  startTime?: string;
  endTime?: string;
};

// export type TSchedule = ScheduleItem[];