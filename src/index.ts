import express from 'express';

import { configs } from './configs/configs.js';

import { connectMongoDB } from './db/mongoDB.js';

import { authRouter } from './modules/auth/routes/auth/auth.router.js';
import { passwordRouter } from './modules/auth/routes/password/password.router.js';
import { emailRouter } from './modules/auth/routes/email/email.router.js';
import { parfumeRouter } from './modules/parfume/routes/parfume.router.js';
import { userRouter } from './modules/user/routes/user/user.router.js';
import { cartRouter } from './modules/user/routes/cart/cart.router.js';

// import { adminUserRouter } from "./modules/admin/users/routes/adminUser.router";

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/password', passwordRouter);
app.use('/account', emailRouter);
app.use('/parfume', parfumeRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
// app.use("/admin", adminUserRouter);

const start = async () => {
  try {
    await connectMongoDB();

    app.listen(configs.APP_PORT, () => {
      console.log(`Server is running on port ${configs.APP_PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

start();
