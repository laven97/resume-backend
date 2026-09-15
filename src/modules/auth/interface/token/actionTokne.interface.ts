import { ActionTokenTypeEnum } from "../../enums/action-token-type.enum.js";

export interface IActionToken {
  _id?: string;
  token: string;
  type: ActionTokenTypeEnum;
  _userId: string;

  metadata?: Record<string, any>;
}
