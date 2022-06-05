import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import { User } from "../models/User";
import config from "../config/config";
import {AppDataSource} from "../dataSource/data-source";

class AuthController {
    static login = async (req: Request, res: Response) => {

        let { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send('Нет данных');
            return;
        }

        const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
        } catch (error) {
            res.status(401).send('Юзер не найден');
            return;
        }

        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send('Не правильный пароль');
            return;
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        res.send(token);
    };

    static registration = async (req: Request, res: Response) => {
        let { username, password, role } = req.body;
        let user = new User();

        user.username = username;
        user.password = password;
        user.role = role;

        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        user.hashPassword();

        const userRepository = AppDataSource.getRepository(User);
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("username already in use");
            return;
        }

        res.status(201).send("User created");
    };

    static changePassword = async (req: Request, res: Response) => {
        const id = res.locals.jwtPayload.userId;

        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send('Нет данных');
            return;
        }
        if (typeof oldPassword !== "string" || typeof newPassword !== "string") {
            res.status(400).send('Не правильный формат данных');
            return;
        }

        const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {id: id}});
        } catch (id) {
            res.status(401).send('Нет пользователя');
            return;
        }

        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).send('Не правильный пароль');
            return;
        }

        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        user.hashPassword();
        await userRepository.save(user);

        res.status(200).send('Успешная смена пароля');
    };
}
export default AuthController;