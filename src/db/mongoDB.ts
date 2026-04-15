import mongoose from "mongoose";
import { configs } from "../configs/configs";

export const connectMongoDB = async () => {
  try {
    const mongoURL = configs.MONGO_URL;
    if (!mongoURL) {
      throw new Error("MongoDB URL is not defined in environment variables");
    }

    await mongoose.connect(mongoURL);

    console.log("✅ MongoDB connection established successfully");
  } catch (error) {
    console.error(`Error connecting to database`);
    process.exit(1);
  }
};
