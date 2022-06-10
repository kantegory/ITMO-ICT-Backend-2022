import Hotel from '../../models/hotels/Hotel'
import HotelError from '../../errors/hotels/Hotel'
import { Op, Optional } from 'sequelize'
import { ParsedQs } from 'qs'

class HotelService {
    async list(query: ParsedQs): Promise<Hotel[]> {
        const options = {
            where: {} as any,
        }

        if (query.name) {
            options.where.name = { [Op.like]: `${query.name}%` }
        }

        if (query.city) {
            options.where.city = { [Op.like]: `${query.city}%` }
        }

        if (query.starsFrom && query.starsTo) {
            options.where.stars = { [Op.between]: [query.starsFrom, query.starsTo] }
        } else if (query.starsFrom) {
            options.where.stars = { [Op.gte]: query.starsFrom }
        } else if (query.starsTo) {
            options.where.stars = { [Op.lte]: query.starsTo }
        }

        return await Hotel.findAll(options)
    }

    async create(data: Optional<string, any>): Promise<Hotel | HotelError> {
        try {
            const hotel = await Hotel.create(data)

            return hotel.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new HotelError(errors)
        }
    }

    async retrieve(id: number): Promise<Hotel> {
        const hotel = await Hotel.findByPk(id)

        if (hotel) return hotel.toJSON()

        throw new HotelError('Hotel not found!')
    }

    async update(id: number, data: Optional<string, any>): Promise<boolean | HotelError> {
        const result = await Hotel.update(data, { where: { id: id } })
        const num = result[0]

        if (num === 1) {
            return true
        } else {
            throw new HotelError('An error occurred while updating hotel!')
        }
    }

    async destroy(id: number): Promise<boolean | HotelError> {
        const num = await Hotel.destroy({ where: { id: id } })

        if (num === 1) {
            return true
        } else {
            throw new HotelError('An error occurred while deleting hotel!')
        }
    }
}

export default HotelService
