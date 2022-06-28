import UserService from "../../services/users/UserService";
import RefreshTokenService from "../../services/auth/RefreshTokenService";
import {jwtOptions} from "../../middlewares/passport";
import jwt from "jsonwebtoken";


class RefreshTokenController {
    private refreshTokenService: RefreshTokenService;
    private userService: UserService;

    constructor() {
        this.refreshTokenService = new RefreshTokenService();
        this.userService = new UserService();
    }

    auth = async (request: any, response: any) => {
        // Логин
        const {body} = request;
        const {email, password} = body;
        try {
            const {user, checkPassword} = await this.userService.checkPassword(email, password);
            if (checkPassword) {
                const payload = {id: user.id};
                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey);
                const refreshToken = await this.refreshTokenService.generateRefreshToken();

                response.send({accessToken, refreshToken});
            } else {
                response.status(400).send({'error': 'Неверный логин или пароль'});
            }
        } catch (error: any) {
            response.status(400).send({'error': error.message});
        }
    }

    refreshToken = async (request: any, response: any) => {
        // Получение токенов
        const {body} = request;
        const {refreshToken} = body;
        try {
            const {userId, isExpired} = await this.refreshTokenService.isRefreshTokenExpired(refreshToken);
            if (!isExpired && userId) {
                try {
                    const user = await this.userService.getById(userId);
                    const payload = {id: user.id};
                    const accessToken = jwt.sign(payload, jwtOptions.secretOrKey);
                    const refreshTokenService = new RefreshTokenService(user);
                    const refreshToken = await refreshTokenService.generateRefreshToken();
                    response.send({accessToken, refreshToken});
                } catch (e: any) {
                    response.status(400).send({'error': e.message});
                }
            } else {
                response.status(401).send({'error': 'Ошибка доступа'});
            }
        } catch (e: any) {
            response.status(401).send({'error': e.message});
        }
    }
}

export default RefreshTokenController;
