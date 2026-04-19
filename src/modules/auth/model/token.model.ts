import { model, Schema } from "mongoose";

import { IToken } from "../interface/token.interface";

const TokenSchema = new Schema({
  refreshToken: { type: String, required: true },
  // accessToken: { type: String, required: true },

  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Token = model<IToken>("token", TokenSchema);
