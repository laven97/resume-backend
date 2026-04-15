import { model, Schema } from "mongoose";

import { IToken } from "../../interfaces/auth/token.interface";
import { User } from "../user/user.model";

const TokenSchema = new Schema({
  refreshToken: { type: String, required: true },
  accessToken: { type: String, required: true },

  userId: { type: Schema.Types.ObjectId, ref: User },
});

export const Token = model<IToken>("token", TokenSchema);
