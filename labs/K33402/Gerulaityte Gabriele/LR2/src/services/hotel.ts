import HotelError from '../errors/hotels/hotel'
import { Hotel } from '../models/hotel/hotel'
import { getRepository, ILike } from 'typeorm'


class HotelService {
    async getById(id: string){
        const hotelRepository = await getRepository(Hotel)

        const hotel = hotelRepository.findOneBy({ id: parseInt(id) })

        if (hotel) return hotel

        throw new HotelError('Not found!')

    }

    async create(hotel: any): Promise<Hotel|Error>{

        try {
            const hotelRepository = await getRepository(Hotel)
            const newHotel =  await hotelRepository.save(hotel)
            return newHotel
        } catch (e: any) {
            console.log(e)
            throw new HotelError(e)
        }
    }

    async listHotels(){
        const hotelRepository = await getRepository(Hotel)
        const hotels = await hotelRepository.find()

        if (hotels) return hotels

        throw new HotelError('Not found!')
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
