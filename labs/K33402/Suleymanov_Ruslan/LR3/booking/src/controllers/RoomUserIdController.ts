import { Request, Response } from "express";
import {validate} from "class-validator";

import {AppDataSource} from "../dataSource/data-source";
import {RoomUserId} from "../models/RoomUserId";

class RoomUserIdController{

    static deleteBooking = async (req: Request, res: Response) => {
        let { userId, roomId } = req.body;

        const rep = AppDataSource.getRepository(RoomUserId);
        let booking: RoomUserId;
        try {
            booking = await rep.findOneOrFail({where: {RoomId: roomId }});
        } catch (error) {
            res.status(404).send("Бронирование не найдено");
            return;
        }
        await rep.delete(booking.id);

        res.send('Бронирование удалено');
    };

    static createBooking = async (req: Request, res: Response) => {
        let { userId, roomId } = req.body;

        const rep = AppDataSource.getRepository(RoomUserId);
        try {
            await rep.findOneOrFail({where: {RoomId: roomId }});
            res.status(400).send("Уже забронирована");
            return;
        } catch (error) {}

        let room = new RoomUserId();
        room.RoomId = roomId
        room.UserId = userId

        const errors = await validate(room);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await rep.save(room);
        } catch (e) {
            res.status(409).send("Что-то пошло не так");
            return;
        }

        res.status(201).send("забронировано");
    };
}

export default RoomUserIdController;