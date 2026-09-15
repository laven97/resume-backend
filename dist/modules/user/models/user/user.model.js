"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userRole_enum_1 = require("../../enum/userRole.enum");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, requered: true },
    avatar: { type: String, required: false },
    role: {
        type: String,
        enum: userRole_enum_1.UserRole,
        default: userRole_enum_1.UserRole.USER,
        required: true,
    },
    phone: { type: String, required: false },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)('user', userSchema);
