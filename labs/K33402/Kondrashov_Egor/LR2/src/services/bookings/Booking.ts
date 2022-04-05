import { getRepository } from 'typeorm';
import Booking from '../../orm/models/bookings/Booking';
import HotelService from '../hotels/Hotel';
import UserService from '../users/User';

class BookingService {

    async getById(id: number): Promise<Booking> {
        const booking = await getRepository(Booking).findOne(id);

        if (booking) return booking;

        throw new Error('Hotel with specified ID is not found');
    }

    async listByUser(userId: number): Promise<Booking[]> {
        const bookings = await getRepository(Booking).find({
            relations: ['user'],
            where: {
                user: {
                    id: userId
                }
            }
        });
        return bookings;
    }

    async create(bookingData: {
        user_id: number, hotel_id: number, starts_at: Date, ends_at: Date, number_of_guests: number
    }): Promise<Booking> {
        try {
            const booking = new Booking()
            booking.starts_at = bookingData.starts_at
            booking.ends_at = bookingData.ends_at
            booking.number_of_guests = bookingData.number_of_guests

            const userService = new UserService
            const user = await userService.getById(bookingData.user_id)

            const hotelService = new HotelService
            const hotel = await hotelService.getById(bookingData.hotel_id)

            booking.user = user
            booking.hotel = hotel
            const bookingDb = await getRepository(Booking).save(booking)
            return bookingDb
        } catch (e: any) {
            throw new Error(e)
        }
    }

}

export default BookingService
