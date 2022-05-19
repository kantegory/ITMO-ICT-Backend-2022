import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Portfolio} from "./Portfolio";
import {Stock} from "./Stock";

@Entity('PortfolioStock')
export class PortfolioStock {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Portfolio, (portfolio) => portfolio.stocks)
    portfolio: Portfolio;

    @ManyToOne(() => Stock, (stock) => stock.portfolios)
    stock: Stock;

    @Column()
    timestamp: number;

    @Column()
    price: number;

    @Column()
    isSold: boolean;
}