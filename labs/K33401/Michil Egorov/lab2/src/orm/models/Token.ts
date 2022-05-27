import {Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./User";

@Entity('authToken')
export class AuthToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int'})
    userId: number

    @OneToOne(() => User, (user) => user.authToken, {onDelete: "CASCADE"})
    @JoinColumn({ name: "userId" })
    user: User

    @Column()
    token: string
}