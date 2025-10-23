import Subject from "./Student.model";

const CreateSubject = async (payload: any) => {
  const response = await Subject.create({ payload });
  return response;
};

const GetAllSubjects = async () => {
  const res = await Subject.find();
  return res;
};
const GetSingleSubject = async (id: string) => {
  const res = await Subject.findById(id);
  return res;
};
export const SubjectServices = {
  CreateSubject,
  GetAllSubjects,
  GetSingleSubject,
};
