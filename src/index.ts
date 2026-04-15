import express from "express";

import { configs } from "./configs/configs";
import { authRouter } from "./routes/auth/auth.router";
import { connectMongoDB } from "./db/mongoDB";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

const start = async () => {
  try {
    await connectMongoDB();

    app.listen(configs.APP_PORT, () => {
      console.log(`Server is running on port ${configs.APP_PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

start()