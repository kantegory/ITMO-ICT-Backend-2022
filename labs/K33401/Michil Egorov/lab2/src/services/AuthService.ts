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

    public async changeToken(userData: {email: string, password: string}) : Promise<AuthToken> {
        const token = await this.auth(userData);
        token.token = (Math.random() + 1).toString(36).substring(7);
        return getConnection().getRepository(AuthToken).save(token);
    }

    public async delete(userData: {email: string, password: string}): Promise<void> {
        const entity = await this.auth(userData);
        await getConnection().getRepository(AuthToken).remove(entity);
    }
}

export default AuthService
