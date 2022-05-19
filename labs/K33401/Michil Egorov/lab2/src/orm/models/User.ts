import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Portfolio} from "./Portfolio";

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
}