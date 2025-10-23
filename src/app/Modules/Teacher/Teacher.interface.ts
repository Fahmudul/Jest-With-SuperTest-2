import mongoose from "mongoose";

export interface IAvailabilitySchedule {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface IAvailability {
  [key: string]: IAvailabilitySchedule[];
}

export interface ITeacher {
  name?: string;
  email: string;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  googleid?: string;
  phone?: string;
  user?: mongoose.Types.ObjectId;
  image?: string;
  availability: IAvailability;
  description?: string;
  hourlyRate?: number;
  balance :number;
  canAccess:boolean;
  available?:boolean;
}
