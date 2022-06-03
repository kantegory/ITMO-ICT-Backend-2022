import { getRepository, ILike } from 'typeorm';
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

    async getFilteredList(q: string): Promise<Hotel[]> {
        const hotels = await getRepository(Hotel).find({
            where: {
                address: ILike(`%${q}%`)
            }
        });
        return hotels;
    }

}

export default HotelService
