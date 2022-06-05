import { getRepository } from 'typeorm';
import Hotel from '../../orm/models/hotels/Hotel';

class HotelService {

    async getById(id: number): Promise<Hotel> {
        const hotel = await getRepository(Hotel).findOne(id);

        if (hotel) return hotel;

        throw new Error('Hotel with specified ID is not found');
    }
}

export default HotelService
