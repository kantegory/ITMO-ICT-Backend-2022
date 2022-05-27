import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Portfolio} from "./Portfolio";
import { AuthToken } from "./Token";

@Entity('User1')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Portfolio, (portfolio) => portfolio.user, {onDelete: "CASCADE"})
    portfolios: Portfolio[];

    @OneToOne(() => AuthToken, (token) => token.user, {onDelete: "CASCADE"})
    authToken: AuthToken
}