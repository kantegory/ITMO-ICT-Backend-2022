import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Portfolio} from "./Portfolio";
import {Stock} from "./Stock";

@Entity('PortfolioStock')
export class PortfolioStock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    portfolio_id: number

    @ManyToOne(() => Portfolio, (portfolio) => portfolio.stocks, {onDelete: "CASCADE"})
    @JoinColumn({name: 'portfolio_id'})
    portfolio: Portfolio;

    @Column({ type: 'int' })
    stock_id: number

    @ManyToOne(() => Stock, (stock) => stock.portfolios, {onDelete: "CASCADE"})
    @JoinColumn({name: 'stock_id'})
    stock: Stock;

    @Column({type: 'timestamp'})
    timestamp: Date;

    @Column()
    price: number;

    @Column({default: 0})
    amount: number;
}