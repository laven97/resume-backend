import { model, Schema } from "mongoose";

import { ActionTokenTypeEnum } from "../../enums/action-token-type.enum.js";
import { IActionToken } from "../../interface/token/actionTokne.interface.js";

const ActionTokenSchema = new Schema({
  token: { type: String, required: true },
  type: { type: String, requered: true, enum: ActionTokenTypeEnum },

  _userId: { type: String, requered: true },
});

export const ActionToken = model<IActionToken>(
  "actionToken",
  ActionTokenSchema
);
