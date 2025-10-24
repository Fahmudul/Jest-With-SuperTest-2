jest.mock("../app/Modules/book/book.model");
import mongoose from "mongoose";
import { Book } from "../app/Modules/book/book.model";
import { BookService } from "../app/Modules/book/book.services";

describe("Book Service Unit Tests", () => {
  const mockBook = {
    title: "Atomic Habits",
    author: "James Clear",
    publishedDate: new Date("2018-10-16"),
    pages: 320,
  };
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a new book", async () => {
    (Book.create as jest.Mock).mockResolvedValue(mockBook);

    const result = await BookService.createBook(mockBook);

    expect(result).toEqual(mockBook);
    expect(Book.create).toHaveBeenCalledTimes(1);
  });

  describe("UpdateBook()", () => {
    it("Should return an error when the id is not valid", async () => {
      expect(BookService.updateBook("1234", { pages: 400 })).rejects.toThrow(
        "Invalid book ID"
      );
    });

    it("Should throw an error when updating a book not exists", async () => {
      const bookId = new mongoose.Types.ObjectId();
      (Book.findById as jest.Mock).mockRejectedValue(
        new Error("Book not found")
      );
      // const result = await ;
      await expect(
        BookService.updateBook(bookId.toString(), { pages: 350 })
      ).rejects.toThrow("Book not found");
    });
  });
});
