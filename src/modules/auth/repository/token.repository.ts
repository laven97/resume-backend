import { IToken, ITokenPair } from "../interface/token.interface";
import { Token } from "../model/token.model";

class TokenRepository {
  public async create(dto: IToken): Promise<ITokenPair> {
    return await Token.create(dto);
  }

  public async deleteOnByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }
}

export const tokenRepository = new TokenRepository();
