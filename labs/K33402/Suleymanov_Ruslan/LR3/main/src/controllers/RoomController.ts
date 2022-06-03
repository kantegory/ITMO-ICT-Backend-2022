import { Request, Response } from "express";
import {validate} from "class-validator";

import {AppDataSource} from "../dataSource/data-source";
import {Room} from "../models/Room";
import {IsNull, Like, MoreThanOrEqual, Raw} from "typeorm";

class RoomController{

    static allRoom = async (req: Request, res: Response) => {
        let city = req.query.city as unknown as string;
        let date = req.query.date as unknown as Date;
        let count = req.query.count as unknown as number;

        const roomRep = AppDataSource.getRepository(Room);
        const rooms = await roomRep.find(
            {where:  {
                    countPerson: count && MoreThanOrEqual(count),
                    city: city && Like( `%${city}%`),
                    date: date && Raw((alias) => `${alias} > :date`, { date: date }),
                    user: IsNull()
                }, relations: ["user"]
            }
        );
        if (rooms.length) {
            res.send(rooms);
        } else {
            res.send('Не найдено результатов');
        }
    };

    static getOneRoom = async (req: Request, res: Response) => {
        const id: number = req.params.id as unknown as number;

        const roomRep = AppDataSource.getRepository(Room);
        try {
            const room = await roomRep.findOneOrFail({where: {id: id}});
            res.send(room);
        } catch (error) {
            res.status(404).send("Room not found");
        }
    };

    static newRoom = async (req: Request, res: Response) => {
        let { name, hotelName, price, countPerson, city, date } = req.body;
        const roomRep = AppDataSource.getRepository(Room);

        try {
            await roomRep.findOneOrFail({where: {name: name}});
            res.status(400).send("Комната с таким именем уже существует");
            return;
        } catch (error) {}

        let room = new Room();

        room.name = name;
        if (hotelName) {room.hotelName = hotelName}
        room.price = price;
        room.countPerson = countPerson;
        room.city = city;
        room.date = date;

        const errors = await validate(room);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await roomRep.save(room);
        } catch (e) {
            res.status(409).send("room already in use");
            return;
        }

        res.status(201).send("room created");
    };

    static editRoom = async (req: Request, res: Response) => {
        const id = req.params.id as any;

        let { name, hotelName, price, countPerson, city, timeStart } = req.body;

        const roomRep = AppDataSource.getRepository(Room);
        let room;
        try {
            room = await roomRep.findOneOrFail({where: {id: id}});
        } catch (error) {
            res.status(404).send("room not found");
            return;
        }

        name ? room.name = name : null;
        hotelName ? room.hotelName = hotelName : null;
        price ? room.price = price : null;
        countPerson ? room.countPerson = countPerson : null;
        city ? room.city = city : null;
        timeStart ? room.date = timeStart : null;

        const errors = await validate(room);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await roomRep.save(room);
        } catch (e) {
            res.status(409).send("error");
            return;
        }

        room = await roomRep.findOneOrFail({where: {id: id}});

        res.send(room);
    };

    static deleteRoom = async (req: Request, res: Response) => {
        const id = req.params.id as any;

        const roomRep = AppDataSource.getRepository(Room);
        let room: Room;
        try {
            room = await roomRep.findOneOrFail({where: {id: id}});
        } catch (error) {
            res.status(404).send("room not found");
            return;
        }
        await roomRep.delete(id);

        res.send('room deleted');
    };
}

export default RoomController;