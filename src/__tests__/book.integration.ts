import supertest from "supertest";
import { setupTestDB, teardownTestDB } from "../app/Utils/setup";
import createServer from "../createServer";

const app = createServer();
beforeAll(async () => await setupTestDB());
afterAll(async () => await teardownTestDB());

describe("Book Module Integration Tests", () => {
  let bookId: string;
  let bookData = {
    title: "Clean Code",
    author: "Robert C. Martin",
    publishedDate: "2008-08-01",
    pages: 464,
  };
  describe("Create Book", () => {
    it("Should create a book successfully", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/api/v1/book")
        .send(bookData);

      expect(statusCode).toBe(201);
      expect(body.success).toBeTruthy();
      expect(body.data.title).toBe(bookData.title);
      bookId = body.data._id;
    });
  });

  describe("List all Books", () => {
    it("Should list all books", async () => {
      const { statusCode, body } = await supertest(app).get("/api/v1/book");
      expect(statusCode).toBe(200);
      expect(body.success).toBeTruthy();
      expect(Array.isArray(body.data)).toBeTruthy();
    });
  });

  describe("Get Book By ID", () => {
    it("Should get book by id", async () => {
      const { statusCode, body } = await supertest(app).get(
        `/api/v1/book/${bookId}`
      );
      expect(statusCode).toBe(200);
      expect(body.success).toBeTruthy();
      expect(body.data._id).toBe(bookId);
    });
  });

  describe("Update Book", () => {
    it("Should update book details", async () => {
      const { statusCode, body } = await supertest(app)
        .put(`/api/v1/book/${bookId}`)
        .send({ pages: 500 });
    });
  });

  describe("Delete Book", () => {
    it("Should delete the book", async () => {
      const { statusCode, body } = await supertest(app).delete(
        `/api/v1/book/${bookId}`
      );
      expect(statusCode).toBe(200);
      expect(body.success).toBeTruthy();
    });
  });
});
