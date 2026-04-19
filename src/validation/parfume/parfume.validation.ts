import { Segments } from "celebrate";
import Joi from "joi";

export class ParfumeValidation {
  private static name = Joi.string().trim().required();
  private static title = Joi.string().trim().required().min(5);
//   private static description = Joi.string().trim().required().min(5);
//   private static atmosphere = Joi.string().trim().required();
//   private static longevity = Joi.string().trim().required();
//   private static topNotes = Joi.string().trim().required();
//   private static heartNotes = Joi.string().trim().required();
//   private static baseNotes = Joi.string().trim().required();
//   private static price = Joi.number().required();

  public static createParfume = {
    [Segments.BODY]: Joi.object({
      name: this.name,
      title: this.title,
    //   decription: this.description,
    //   atmosphere: this.atmosphere,
    //   longevity: this.longevity,
    //   topNotes: this.topNotes,
    //   heartNotes: this.heartNotes,
    //   baseNotes: this.baseNotes,
    //   price: this.price,
    }),
  };
}
