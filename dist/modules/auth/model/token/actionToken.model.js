"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionToken = void 0;
const mongoose_1 = require("mongoose");
const action_token_type_enum_1 = require("../../enums/action-token-type.enum");
const ActionTokenSchema = new mongoose_1.Schema({
    token: { type: String, required: true },
    type: { type: String, requered: true, enum: action_token_type_enum_1.ActionTokenTypeEnum },
    _userId: { type: String, requered: true },
});
exports.ActionToken = (0, mongoose_1.model)("actionToken", ActionTokenSchema);
