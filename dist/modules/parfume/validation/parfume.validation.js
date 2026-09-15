import { Segments } from "celebrate";
import Joi from "joi";
export class ParfumeValidation {
    static name = Joi.string().trim();
    static title = Joi.string().trim().min(5);
    static price = Joi.number();
    static createParfume = {
        [Segments.BODY]: Joi.object({
            name: this.name.required(),
            title: this.title.required(),
            price: this.price,
        }),
    };
    static updateParfume = {
        [Segments.BODY]: Joi.object({
            name: this.name,
            title: this.title,
            price: this.price
        })
    };
}
