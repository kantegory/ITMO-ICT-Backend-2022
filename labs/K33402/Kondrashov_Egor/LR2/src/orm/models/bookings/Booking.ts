import { IsDateString, validateOrReject } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

    @IsDateString()
    @Column('date')
    starts_at: Date;

    @IsDateString()
    @Column('date')
    ends_at: Date;

    @Column('smallint')
    number_of_guests: number;

    @BeforeInsert()
    @BeforeUpdate()
    validate(): Promise<void> {
        return validateOrReject(this);
    }
}

export default Booking
