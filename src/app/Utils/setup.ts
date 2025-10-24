import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
let mongoserver: MongoMemoryServer;
export const setupTestDB = async () => {
  mongoserver = await MongoMemoryServer.create();
  const uri = mongoserver.getUri();
  mongoose.connect(uri);
};

export const teardownTestDB = async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  mongoserver.stop();
};
