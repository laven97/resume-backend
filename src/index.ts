import express from "express";

import { configs } from "./configs/configs";
import { authRouter } from "./routes/auth/auth.router";
import { parfumeRouter } from "./routes/parfume/parfume.router";
import { userRouter } from "./routes/user/user.router";
import { connectMongoDB } from "./db/mongoDB";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/parfume", parfumeRouter);
app.use("/user", userRouter);

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

start();
