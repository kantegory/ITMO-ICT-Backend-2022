import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Booking from '../bookings/Booking';

@Entity('hotels')
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({
        length: 511
    })
    name: string;


    @Column({
        length: 1023
    })
    address: string;

    @Column({
        length: 2047
    })
    img_url: string;

    @Column({
        type: 'text'
    })
    description: string;

    @Column({
        type: 'float', nullable: true
    })
    rating: number

    @Column({
        type: 'float', nullable: true
    })
    cost_from: number

    @OneToMany(() => Booking, (booking) => booking.hotel)
    bookings: Booking[]
}

export default Hotel
