import mongoose from "mongoose";

export interface ISubject {
  name: string;
  category: string;
  description: string;
  tutor: mongoose.Types.ObjectId;
  image?: string;
}
