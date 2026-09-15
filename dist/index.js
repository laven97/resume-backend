"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const configs_1 = require("./configs/configs");
const mongoDB_1 = require("./db/mongoDB");
const auth_router_1 = require("./modules/auth/routes/auth/auth.router");
const password_router_1 = require("./modules/auth/routes/password/password.router");
const email_router_1 = require("./modules/auth/routes/email/email.router");
const parfume_router_1 = require("./modules/parfume/routes/parfume.router");
const user_router_1 = require("./modules/user/routes/user/user.router");
const cart_router_1 = require("./modules/user/routes/cart/cart.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', auth_router_1.authRouter);
app.use('/password', password_router_1.passwordRouter);
app.use('/account', email_router_1.emailRouter);
app.use('/parfume', parfume_router_1.parfumeRouter);
app.use('/user', user_router_1.userRouter);
app.use('/cart', cart_router_1.cartRouter);
const start = async () => {
    try {
        await (0, mongoDB_1.connectMongoDB)();
        app.listen(configs_1.configs.APP_PORT, () => {
            console.log(`Server is running on port ${configs_1.configs.APP_PORT}`);
        });
    }
    catch (err) {
        console.error('Failed to start server:', err);
    }
};
start();
