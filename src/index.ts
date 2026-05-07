import express from "express";

import { configs } from "./configs/configs";
import { authRouter } from "./modules/auth/routes/auth.router";

import { userRouter } from "./modules/user/routes/user.router";
import { connectMongoDB } from "./db/mongoDB";
import { parfumeRouter } from "./modules/parfume/routes/parfume/parfume.router";

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
