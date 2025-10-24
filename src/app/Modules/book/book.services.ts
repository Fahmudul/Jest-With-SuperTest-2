import { Book, IBook } from "./book.model";
import { Types } from "mongoose";

const createBook = async (payload: {
  title: string;
  author: string;
  publishedDate: Date;
  pages: number;
}): Promise<IBook> => {
  return await Book.create(payload);
};

const getBookById = async (id: string): Promise<IBook | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await Book.findById(id).exec();
};

const updateBook = async (
  id: string,
  payload: Partial<{
    title: string;
    author: string;
    publishedDate: Date;
    pages: number;
  }>
): Promise<IBook | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await Book.findByIdAndUpdate(id, payload, { new: true }).exec();
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await Book.findByIdAndDelete(id).exec();
};

const listBooks = async (
  filter: Partial<{ author: string; title: string }> = {},
  skip = 0,
  limit = 10
): Promise<IBook[]> => {
  return await Book.find(filter as any)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .exec();
};

export const BookService = {
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  listBooks,
};
