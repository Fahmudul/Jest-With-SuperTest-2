import mongoose from "mongoose";

export interface IStudent {
  name?: string;
  email: string;
  user?: mongoose.Types.ObjectId;
  phone?: string;
  image?: string;
  description?: string;
}
