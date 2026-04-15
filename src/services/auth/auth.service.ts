import { ITokenPair } from "../../interfaces/auth/token.interface";
import { IUser } from "../../interfaces/user/user.interface";
import { tokenRepository } from "../../repositories/auth/token.repository";
import { userRepository } from "../../repositories/user/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: IUser
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const password = await passwordService.hashedPassword(dto.password);
    const user = await userRepository.createUser({ ...dto, password });

    const tokens = await tokenService.generateTokenPair({
      userId: user._id!.toString(),
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, userId: user._id!.toString() });

    return { user, tokens };
  }
}

export const authService = new AuthService();
