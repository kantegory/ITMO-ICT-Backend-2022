import { Request, Response } from "express";
import { validate } from "class-validator";

import { User } from "../models/User";
import {AppDataSource} from "../dataSource/data-source";

class UserController{

    static listAll = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find({
            select: ["id", "username", "role", "rooms"]
        });

        res.send(users);
    };

    static getOneById = async (req: Request, res: Response) => {
        const id: number = req.params.id as unknown as number;

        const userRepository = AppDataSource.getRepository(User);
        try {
            const user = await userRepository.findOneOrFail({where: {id: id}});
            res.send(user);
        } catch (error) {
            res.status(404).send("User not found");
        }
    };

    static me = async (req: Request, res: Response) => {
        const id = res.locals.jwtPayload.userId;

        const userRepository = AppDataSource.getRepository(User);
        try {
            const user = await userRepository.findOneOrFail({where: {id: id}});
            res.send(user);
        } catch (error) {
            res.status(404).send("User not found");
        }
    };

    static newUser = async (req: Request, res: Response) => {
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

    static editUser = async (req: Request, res: Response) => {
        const id = req.params.id as any;

        const { username, role } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail({where: {id: id}});
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        user.username = username || user.username;
        user.role = role || user.role;

        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("username already in use");
            return;
        }
        user = await userRepository.findOneOrFail({where: {id: id}});

        res.send(user);
    };

    static deleteUser = async (req: Request, res: Response) => {
        const id = req.params.id as any;

        const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {id: id}});
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        await userRepository.delete(id);

        res.send('User deleted');
    };
}

export default UserController;