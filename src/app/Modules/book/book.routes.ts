import express from "express";
import {
  createBook,
  getBook,
  updateBook,
  deleteBook,
  listBooks,
} from "./book.controllers";

const router = express.Router();

// Base path: /api/v1/books
router.post("/", createBook);
router.get("/", listBooks);
router.get("/:id", getBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export const BookRoutes = router;
