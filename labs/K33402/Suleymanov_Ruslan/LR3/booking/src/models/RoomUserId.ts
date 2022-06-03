import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import {IsNotEmpty} from "class-validator";

@Entity()
export class RoomUserId {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    RoomId: string;

    @Column()
    @IsNotEmpty()
    UserId: number;

}