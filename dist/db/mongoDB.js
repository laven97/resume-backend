"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const configs_1 = require("../configs/configs");
const connectMongoDB = async () => {
    try {
        const mongoURL = configs_1.configs.MONGO_URL;
        if (!mongoURL) {
            throw new Error("MongoDB URL is not defined in environment variables");
        }
        await mongoose_1.default.connect(mongoURL);
        console.log("✅ MongoDB connection established successfully");
    }
    catch (error) {
        console.error(`Error connecting to database`, error);
        process.exit(1);
    }
};
exports.connectMongoDB = connectMongoDB;
