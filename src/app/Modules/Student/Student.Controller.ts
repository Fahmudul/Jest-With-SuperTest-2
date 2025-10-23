import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { SubjectServices } from "./Student.services";

const CreateSubject = catchAsync(async (req, res) => {
  // console.log(req.body);
  const response = await SubjectServices.CreateSubject(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " Schedule saved successfully",
    success: true,
    data: response,
  });
});

const GetAllSubjects = catchAsync(async (req, res) => {
  const result = await SubjectServices.GetAllSubjects();
  // console.log("from line 20", req.params.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: " All subects retrieved successfully",
    success: true,
    data: result,
  });
});
const GetSingleSubject = catchAsync(async (req, res) => {
  const result = await SubjectServices.GetSingleSubject(req.params.id);
  // console.log("from line 20", req.params.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Subject details retrieved successfully",
    success: true,
    data: result,
  });
});
export const SubjectControllers = {
  CreateSubject,
  GetAllSubjects,
  GetSingleSubject,
};
