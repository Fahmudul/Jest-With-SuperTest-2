import { Schema, model } from "mongoose";
import { TUser } from "./Auth.interface";

const userModel = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    role: { type: String, required: true, default: "user" },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

const User = model<TUser>("Users", userModel);
export default User;
