import { Schema, model } from "mongoose";
import { IStudent } from "./Student.interface";

const studentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Student = model<IStudent>("Student", studentSchema);

export default Student;
