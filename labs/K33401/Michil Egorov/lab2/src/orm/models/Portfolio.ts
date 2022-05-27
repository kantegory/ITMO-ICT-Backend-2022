import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {PortfolioStock} from "./PortfolioStock";
import {Stock} from "./Stock";

@Entity('portfolio')
export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({type: 'int'})
    user_id: number
    
    @Column({default: 0})
    balance: number
    
    @ManyToOne(() => User, (user) => user.portfolios, {onDelete: "CASCADE"})
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToMany(() => PortfolioStock, (ps) => ps.portfolio, {onDelete: "CASCADE"})
    stocks: PortfolioStock[];
}