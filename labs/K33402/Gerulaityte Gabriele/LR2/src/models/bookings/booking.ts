import { Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, Column } from 'typeorm'
import { User } from '../user/user'
import { Hotel } from '../hotel/hotel'

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User

    @Column()
    userId!: number

    @OneToOne(() => Hotel)
    hotel!: Hotel
}
