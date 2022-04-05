import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Hotel from '../hotels/Hotel';
import User from '../users/User';

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.bookings)
    user: User;

    @ManyToOne(() => Hotel, (hotel) => hotel.bookings)
    hotel: Hotel;

    @Column('date')
    starts_at: Date;

    @Column('date')
    ends_at: Date;

    @Column('smallint')
    number_of_guests: number;
}

export default Booking
