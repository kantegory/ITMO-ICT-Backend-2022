import { getRepository } from 'typeorm';
import Booking from '../../orm/models/bookings/Booking';

class BookingService {

    async getById(id: number): Promise<Booking> {
        const booking = await getRepository(Booking).findOne(id);

        if (booking) return booking;

        throw new Error('Hotel with specified ID is not found');
    }

    async listByUser(userId: number): Promise<Booking[]> {
        const bookings = await getRepository(Booking).find({
            join: { alias: 'bookings', innerJoin: { users: 'bookings.users' } },
            where: qb => { qb.where('users.id = :userId', { userId: userId }) }
        });
        return bookings;
    }

    async create(bookingData: {
        user_id: number, hotel_id: number, starts_at: Date, ends_at: Date, number_of_guests: number
    }): Promise<Booking> {
        try {
            const booking = await getRepository(Booking).save(bookingData)
            return booking
        } catch (e: any) {
            throw new Error(e)
        }
    }

}

export default BookingService
