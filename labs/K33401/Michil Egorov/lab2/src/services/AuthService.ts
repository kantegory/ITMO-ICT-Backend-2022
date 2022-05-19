import { getConnection } from "typeorm"
import { AuthToken } from "../orm/models/Token";
import UserService from "./UserService"


class AuthService {
    public async auth(userData: {email: string, password: string}) : Promise<AuthToken> {
        const user = await new UserService().getByEmail(userData.email);
        
        if(user.password !== userData.password) {
            throw new Error("Password is not correct");
        }

        const tokenRepo = getConnection().getRepository(AuthToken);
        
        return await tokenRepo.findOne({where: {user: user}}).then(async (token) => {
            if(token) {
                return token;
            }

            return tokenRepo.save({
                user: user,
                token: (Math.random() + 1).toString(36).substring(7)
            });
        })
    }
}

export default AuthService
