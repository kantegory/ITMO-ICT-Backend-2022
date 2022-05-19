import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Portfolio} from "./Portfolio";
import { AuthToken } from "./Token";

@Entity('User1')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
    portfolios: Portfolio[];

    @OneToOne(() => AuthToken, (token) => token.user)
    authToken: AuthToken
}