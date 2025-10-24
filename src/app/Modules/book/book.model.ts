import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  publishedDate: Date;
  pages: number;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    pages: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);
