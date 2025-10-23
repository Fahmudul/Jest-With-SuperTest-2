import { Schema, model } from "mongoose";
import { ISubject } from "./Subject.interface";

const subjectSchema = new Schema<ISubject>(
  {
    name: { type: String },
    category: { type: String },
    description: { type: String },
    tutor: { type: Schema.Types.ObjectId, ref: "Teacher" },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Subject = model<ISubject>("Subject", subjectSchema);

export default Subject;
