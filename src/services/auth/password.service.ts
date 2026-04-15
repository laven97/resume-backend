import bcrypt from "bcrypt";

class PasswordService {
     async hashedPassword(password:string):Promise<string>{
        return await bcrypt.hash(password,10)
    }
}

export const passwordService = new PasswordService();
