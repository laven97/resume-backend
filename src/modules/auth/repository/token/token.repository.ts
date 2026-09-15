import { IToken } from "../../interface/token/token.interface.js";
import { Token } from "../../model/token/token.model.js";


class TokenRepository {
  public async create(dto: IToken): Promise<IToken> {
    return await Token.create(dto);
  }

  public async deleteOneByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }

  public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
    return await Token.findOne(params);
  }

}

export const tokenRepository = new TokenRepository();
