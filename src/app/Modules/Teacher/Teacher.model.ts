import { Schema, model } from "mongoose";
import { ITeacher } from "./Teacher.interface";

const teacherSchema = new Schema<ITeacher>({
  name: { type: String },
  email: { type: String, required: true },
  googleAccessToken: { type: String },
  phone: { type: String },

  image: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  availability: {
    type: Object,
    default: {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
    },
  },
  balance: {
    type: Number,
    default: 0,
  },
  canAccess: {
    type: Boolean,
    default: true,
  },
  available: {
    type: Boolean,
  },
  hourlyRate: {
    type: Number,
  },
});

const Teacher = model<ITeacher>("Teacher", teacherSchema);

export default Teacher;
