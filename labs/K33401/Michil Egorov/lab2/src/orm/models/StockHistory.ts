import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Stock} from "./Stock";

@Entity('stockHistory')
export class StockHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Stock, (stock) => stock.history)
    stock: Stock;

    @Column()
    price: number;

    @Column()
    timestamp: number;
}