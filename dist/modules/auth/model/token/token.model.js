"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    refreshToken: { type: String, required: true },
    id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
});
exports.Token = (0, mongoose_1.model)('token', TokenSchema);
