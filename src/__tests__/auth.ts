import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createServer from "../createServer";
import supertest from "supertest";
import { AuthServices } from "../app/Modules/Auth/Auth.services";
const app = createServer();
describe("Auth Module", () => {
  let mongoServer: MongoMemoryServer;
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    mongoose.connect(mongoUri);
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await mongoServer.stop();
  });
  describe("POST /register", () => {
    it("should register a user", async () => {
      const response = await AuthServices.RegisterUser({
        name: "John Doe",
        email: "joe@jo.com",
        password: "password",
      });
      expect(response.email).toBe("joe@jo.com");
    });
  });

  describe("POST /login", () => {
    it("Should login a user", async () => {
      const { statusCode, body } = await supertest(app)
        .post(`/api/v1/auth/login`)
        .send({ email: "joe@jo.com", password: "password" })
        .set("Accept", "application/json");

      expect(statusCode).toBe(200);
      expect(body.success).toBeTruthy();
    });
  });
});
