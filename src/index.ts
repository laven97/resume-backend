import express from "express";

import { configs } from "./configs/configs";

import { userRouter } from "./modules/user/routes/user.router";
import { connectMongoDB } from "./db/mongoDB";
import { parfumeRouter } from "./modules/parfume/routes/parfume/parfume.router";
import { authRouter } from "./modules/auth/routes/auth/auth.router";
import { passwordRouter } from "./modules/auth/routes/password/password.router";
import { emailRouter } from "./modules/auth/routes/email/email.router";
// import { adminUserRouter } from "./modules/admin/users/routes/adminUser.router";


const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/password", passwordRouter);
app.use("/account", emailRouter);
app.use("/parfume", parfumeRouter);
app.use("/user", userRouter);
// app.use("/admin", adminUserRouter);

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
