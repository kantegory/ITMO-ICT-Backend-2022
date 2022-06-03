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

    @Column({type: 'timestamp'})
    created_at: Date;

    @Column()
    lastPrice: number;

    @OneToMany(() => StockHistory, (stockHistory) => stockHistory.stock, {onDelete: "CASCADE"})
    history: StockHistory[];

    @OneToMany(() => PortfolioStock, (ps) => ps.stock, {onDelete: "CASCADE"})
    portfolios: PortfolioStock[];
}