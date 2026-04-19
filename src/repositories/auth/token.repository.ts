import { IToken, ITokenPair } from "../../interfaces/auth/token.interface";
import { Token } from "../../models/auth/token.model";

class TokenRepository {
  public async create(dto: IToken): Promise<ITokenPair> {
    return await Token.create(dto);
  }

  public async deleteOnByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }
}

export const tokenRepository = new TokenRepository();
