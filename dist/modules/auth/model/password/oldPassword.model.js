"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldPassword = void 0;
const mongoose_1 = require("mongoose");
const OldPasswordSchema = new mongoose_1.Schema({
    password: { type: String, required: true, trim: true },
    _userId: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
exports.OldPassword = (0, mongoose_1.model)("oldPassword", OldPasswordSchema);
