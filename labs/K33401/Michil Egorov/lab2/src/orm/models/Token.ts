import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./User";

@Entity('authToken')
export class AuthToken {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.authToken)
    user: User

    @Column()
    token: string
}