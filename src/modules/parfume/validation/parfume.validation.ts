import { Segments } from "celebrate";
import Joi from "joi";

export class ParfumeValidation {
  private static name = Joi.string().trim();
  private static title = Joi.string().trim().min(5);
//   private static description = Joi.string().trim().min(5);
//   private static atmosphere = Joi.string().trim();
//   private static longevity = Joi.string().trim();
//   private static topNotes = Joi.string().trim();
//   private static heartNotes = Joi.string().trim();
//   private static baseNotes = Joi.string().trim();
// private static stoke = Joi.boolean()
  private static price = Joi.number();

  public static createParfume = {
    [Segments.BODY]: Joi.object({
      name: this.name.required(),
      title: this.title.required(),
    //   decription: this.description,
    //   atmosphere: this.atmosphere,
    //   longevity: this.longevity,
    //   topNotes: this.topNotes,
    //   heartNotes: this.heartNotes,
    //   baseNotes: this.baseNotes,
      price: this.price,
    }),
  };

  public static updateParfume = {
    [Segments.BODY]:Joi.object({
      name:this.name,
      title:this.title,
      price:this.price
    })
  }
}
