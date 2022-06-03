import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Stock} from "./Stock";

@Entity('stockHistory')
export class StockHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    stock_id: number

    @ManyToOne(() => Stock, (stock) => stock.history, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'stock_id' })
    stock: Stock;

    @Column()
    price: number;

    @Column({type: 'timestamp'})
    timestamp: Date;
}