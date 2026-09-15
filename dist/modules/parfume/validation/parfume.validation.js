"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParfumeValidation = void 0;
const celebrate_1 = require("celebrate");
const joi_1 = __importDefault(require("joi"));
class ParfumeValidation {
    static name = joi_1.default.string().trim();
    static title = joi_1.default.string().trim().min(5);
    static price = joi_1.default.number();
    static createParfume = {
        [celebrate_1.Segments.BODY]: joi_1.default.object({
            name: this.name.required(),
            title: this.title.required(),
            price: this.price,
        }),
    };
    static updateParfume = {
        [celebrate_1.Segments.BODY]: joi_1.default.object({
            name: this.name,
            title: this.title,
            price: this.price
        })
    };
}
exports.ParfumeValidation = ParfumeValidation;
