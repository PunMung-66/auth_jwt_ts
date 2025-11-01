import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const { MONGO_URI } = process.env;

const connect = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Connection Failed", message);
    process.exit(1);
  }
};

export { connect };
