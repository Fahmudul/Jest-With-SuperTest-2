import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { BookService } from "./book.services";

export const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);

  sendResponse(res, {
    success: true,
    message: "Book created successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const getBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getBookById(req.params.id);

  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Book not found",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }

  sendResponse(res, {
    success: true,
    message: "Book retrieved successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateBook(req.params.id, req.body);

  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Book not found or invalid id",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }

  sendResponse(res, {
    success: true,
    message: "Book updated successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBook(req.params.id);

  if (!result) {
    sendResponse(res, {
      success: false,
      message: "Book not found or invalid id",
      statusCode: httpStatus.NOT_FOUND,
    });
    return;
  }

  sendResponse(res, {
    success: true,
    message: "Book deleted successfully",
    statusCode: httpStatus.OK,
  });
});

export const listBooks = catchAsync(async (req: Request, res: Response) => {
  const { author, title, skip, limit } = req.query;
  const result = await BookService.listBooks(
    { author: author as string, title: title as string },
    skip ? Number(skip) : 0,
    limit ? Number(limit) : 10
  );

  sendResponse(res, {
    success: true,
    message: "Books fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
