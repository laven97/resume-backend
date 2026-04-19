import bcrypt from "bcrypt";

class PasswordService {
  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparedPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export const passwordService = new PasswordService();
