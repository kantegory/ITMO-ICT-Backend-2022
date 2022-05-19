import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {PortfolioStock} from "./PortfolioStock";
import {Stock} from "./Stock";

@Entity('portfolio')
export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    balance: number
    
    @ManyToOne(() => User, (user) => user.portfolios)
    user: User;

    @OneToMany(() => PortfolioStock, (ps) => ps.portfolio)
    stocks: PortfolioStock[];
}