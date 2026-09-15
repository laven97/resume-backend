"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parfume = void 0;
const mongoose_1 = require("mongoose");
const parfumeSchema = new mongoose_1.Schema({
    id: { type: String, requered: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
});
exports.Parfume = (0, mongoose_1.model)('parfume', parfumeSchema);
