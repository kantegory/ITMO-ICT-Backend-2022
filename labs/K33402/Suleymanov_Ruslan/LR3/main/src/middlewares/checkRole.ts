import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import {AppDataSource} from "../dataSource/data-source";

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload.userId;
        const userRepository = AppDataSource.getRepository(User);
        console.log(id)
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {id: id}});
        } catch (id) {
            res.status(401).send('Не найден пользователь');
            return;
        }
        if (roles.indexOf(user.role) > -1) next();
        else res.status(401).send('Недоступно');
    };
};