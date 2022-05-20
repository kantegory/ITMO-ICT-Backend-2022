import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StockHistory} from "./StockHistory";
import {PortfolioStock} from "./PortfolioStock";
import {Portfolio} from "./Portfolio";

@Entity('stock')
export class Stock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    created_at: number

    @Column()
    lastPrice: number;

    @OneToMany(() => StockHistory, (stockHistory) => stockHistory.stock)
    history: StockHistory[];

    @OneToMany(() => PortfolioStock, (ps) => ps.stock)
    portfolios: PortfolioStock[];
}