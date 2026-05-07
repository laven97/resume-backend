import { model, Schema } from "mongoose";

import { IToken } from "../interface/token.interface";

const TokenSchema = new Schema({
  refreshToken: { type: String, required: true },
  // accessToken: { type: String, required: true },

  id: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Token = model<IToken>("token", TokenSchema);
