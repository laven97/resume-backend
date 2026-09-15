"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_errors_1 = require("http-errors");
const errorHandler = (err, req, res, next) => {
    if ((0, http_errors_1.isHttpError)(err)) {
        return res.status(err.status).json({ message: err.message || err.name });
    }
    res.status(500).json({ message: "Something went wrong" });
};
exports.errorHandler = errorHandler;
