import { getRepository, Like } from 'typeorm';
import Hotel from '../../orm/models/hotels/Hotel';

class HotelService {

    async getById(id: number): Promise<Hotel> {
        const hotel = await getRepository(Hotel).findOne(id);

        if (hotel) return hotel;

        throw new Error('Hotel with specified ID is not found');
    }

    async getList(): Promise<Hotel[]> {
        const hotels = await getRepository(Hotel).find();
        return hotels;
    }

    async getFilteredList(city: string): Promise<Hotel[]> {
        const hotels = await getRepository(Hotel).find({
            address: Like(city)
        });
        return hotels;
    }

}

export default HotelService
