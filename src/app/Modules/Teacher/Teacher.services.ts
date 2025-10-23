import httpStatus from "http-status";
import CustomError from "../../Errors/CustomError";
import QueryBuilder from "../../Querybuilder/QueryBuilder";
import Payment from "../Payment/Payment.model";
import Subject from "../Subject/Subject.model";
import { IAvailability } from "./Teacher.interface";
import Teacher from "./Teacher.model";

const SaveAvailabilityInDB = async (payload: any) => {
  console.log("From teacher service line 4", payload);
  const { email, availability } = payload;
  console.log("availability payload", availability);
  const teacherFound = await Teacher.findOne({ email });
  const updatedAvailability = teacherFound?.availability || {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };
  console.log("updated availability", updatedAvailability);
  Object.keys(availability).forEach((day: string) => {
    if (Array.isArray(availability[day]) && availability[day].length > 0) {
      console.log("hitting", updatedAvailability[day]);

      updatedAvailability[day] = [
        ...(teacherFound?.availability[day] || []),
        ...availability[day],
      ] as { startTime: string; endTime: string; isBooked: boolean }[];
    }
  });
  const response = await Teacher.findOneAndUpdate(
    { email: payload.email },
    { $set: { availability: updatedAvailability } },
    { new: true, upsert: true }
  );
  console.log("avaialability response", response);
  if (!response) {
    throw new CustomError("Teacher not found", httpStatus.NOT_FOUND);
  }
  return response;
};
const GetTeacherDetails = async (id: string) => {
  console.log("from line 30", id);
  const res = await Teacher.findById(id);
  const result = res;
  // console.log(res?.toObject());
  const nonEmptyDays: IAvailability = {};
  if (res?.availability) {
    Object.keys(res.availability).forEach((day) => {
      if (res.availability[day].length > 0) {
        nonEmptyDays[day] = res.availability[day];
      }
    });
  }
  return { ...res?.toObject(), availability: nonEmptyDays };
};
const GetMeTeacherDetails = async (email: string) => {
  // console.log("from line 30", id);
  const res = await Teacher.findOne({ email });
  const result = res;
  // console.log(res?.toObject());
  const nonEmptyDays: IAvailability = {};
  if (res?.availability) {
    Object.keys(res.availability).forEach((day) => {
      if (res.availability[day].length > 0) {
        nonEmptyDays[day] = res.availability[day];
      }
    });
  }
  return { ...res?.toObject(), availability: nonEmptyDays };
};
const GetAvailability = async (email: string) => {
  console.log("from line 30", email);
  const res = await Teacher.findOne({ email });
  const result = res;
  // console.log(res?.toObject());
  const nonEmptyDays: IAvailability = {};
  if (res?.availability) {
    Object.keys(res.availability).forEach((day) => {
      if (res.availability[day].length > 0) {
        nonEmptyDays[day] = res.availability[day];
      }
    });
  }
  // console.log(nonEmptyDays);
  return nonEmptyDays;
};
const GetAllTeacher = async (queryPayload: any) => {
  console.log("query payload", queryPayload);
  // console.log("from line 30", email);
  const TeacherQuery = new QueryBuilder(Teacher.find(), queryPayload)
    .search()
    .filter();

  const totalDocs = await TeacherQuery.countTotal();
  const res = await TeacherQuery.modelQuery.select(
    "-googleAccessToken -balance -availability"
  );
  // const res = await Teacher.find();
  console.log("all teacher", res);
  return { res, totalDocs };
};
const getSingleTeacher = async (id: string) => {
  const res = await Teacher.findById(id).populate("user");
  return res;
};
const getTeacherCalendar = async (id: string) => {
  const res = await Teacher.findById(id);
  const googleAccessToken = res?.googleAccessToken;
  const eventsResponse = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const events = await eventsResponse.json();
  const modifiedResponse = events.items.map((item: any) => ({
    title: item.summary,
    description: item.description,
    start: new Date(item?.start?.dateTime),
    end: new Date(item?.end?.dateTime),
  }));
  console.log("modified ", modifiedResponse);
  return modifiedResponse;
};
const UpdateInformation = async (payload: any) => {
  const isTeacheExists = await Teacher.findOne({ email: payload.email });
  console.log("updated information", isTeacheExists);
  if (!isTeacheExists) {
    throw new CustomError("Teacher not found", httpStatus.NOT_FOUND);
  }
  // convert empty object to non-empty object
  let nonEmptyObject = Object.keys(payload).reduce(
    (acc: Record<string, any>, item) => {
      if (payload[item]) {
        acc[item] = payload[item];
      }
      return acc;
    },
    {}
  );
  delete nonEmptyObject.email;
  console.log("updated information", nonEmptyObject);
  console.log("updated ", isTeacheExists._id);
  nonEmptyObject.hourlyRate = Number(nonEmptyObject.hourlyRate);
  console.log("updated information", nonEmptyObject);
  const updateTeacherInformationSuccessFull = await Teacher.findByIdAndUpdate(
    isTeacheExists._id,
    { $set: nonEmptyObject },
    {
      new: true,
      upsert:true,
      runValidators: true,
    }
  );
  if (!updateTeacherInformationSuccessFull) {
    throw new CustomError(
      "Failed to update teacher information",
      httpStatus.NOT_FOUND
    );
  }
  console.log(
    "updateTeacherInformationSuccessFull",
    updateTeacherInformationSuccessFull
  );
  return updateTeacherInformationSuccessFull;
};
const CreateSubject = async (payload: Record<string, any>) => {
  console.log(payload, "from create subject ");
  const isTeacherExists = await Teacher.findById(payload.tutor);
  // Transform empty object to non-empty object
  const nonEmptyObject = Object.keys(payload).reduce(
    (acc: Record<string, any>, item) => {
      if (payload[item]) {
        acc[item] = payload[item];
      }
      return acc;
    },
    {}
  );
  if (!isTeacherExists) {
    throw new CustomError("Teacher not found", httpStatus.NOT_FOUND);
  }
  const response = await Subject.create(nonEmptyObject);
  return response;
  // return true;
};
const getPaymentDetails = async (email: string) => {
  const isTeacheExists = await Teacher.findOne({ email });

  if (!isTeacheExists) {
    throw new CustomError("Teacher not found", httpStatus.NOT_FOUND);
  }
  const paymentFound = await Payment.findOne({ teacher: isTeacheExists._id });
  return isTeacheExists;
};
export const TeacherServices = {
  SaveAvailabilityInDB,
  GetTeacherDetails,
  GetAvailability,
  GetAllTeacher,
  GetMeTeacherDetails,
  getSingleTeacher,
  getTeacherCalendar,
  UpdateInformation,
  CreateSubject,
  getPaymentDetails,
};
