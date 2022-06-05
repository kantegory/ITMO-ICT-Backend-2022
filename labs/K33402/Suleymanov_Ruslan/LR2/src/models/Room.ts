import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import {User} from "./User";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    hotelName: string;

    @Column()
    @IsNotEmpty()
    price: number;

    @Column()
    @IsNotEmpty()
    city: string;

    @Column()
    @IsNotEmpty()
    countPerson: number;

    @Column()
    @IsNotEmpty()
    date: Date;

    @ManyToOne(() => User, (user) => user.rooms)
    user: User;
}