import { Request, Response } from "express";

import {AppDataSource} from "../dataSource/data-source";
import {Room} from "../models/Room";
import {User} from "../models/User";

class UserRoomController {

    static addRoom = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {id: userId}});
        } catch (error) {
            res.status(404).send("User not found");
            return
        }
        let { roomId } = req.body;

        if (!roomId) {
            res.status(400).send("roomId - не дано");
        }


        const roomRepository = AppDataSource.getRepository(Room);
        let room: Room;
        try {
            room = await roomRepository.findOneOrFail({where: {id: roomId}});
        } catch (error) {
            res.status(404).send("Room not found");
            return
        }

        if (!room?.user?.id) {
            room.user = user;
        } else {
            res.status(404).send("Room already use");
            return
        }

        try {
            await roomRepository.save(room);
            res.send("Успешно добавлено");
            return;
        } catch (e) {
            res.status(409).send("error");
            return;
        }

    };

    static deleteRoom = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const roomId: number = req.params.id as unknown as number;

        const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {id: userId}});
        } catch (error) {
            res.status(404).send("User not found");
            return
        }
        if (!user.rooms.find(el => el.id == roomId)) {
            res.status(404).send("Room not found");
            return
        }

        user.rooms = user.rooms.filter(el => el.id !== Number(roomId))

        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("error");
            return;
        }
        res.send("Успешно удалено");

    };
}

export default UserRoomController;