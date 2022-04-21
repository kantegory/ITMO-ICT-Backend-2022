import dataSource from '../../providers/db'
import Booking from '../../models/bookings/Booking'
import { UpdateResult, DeleteResult } from 'typeorm'

class BookingService {
    repository = dataSource.getRepository(Booking);

    async create(bookingData: object) : Promise<Booking> {
        try {
            const entity = Object.assign(new Booking(), bookingData)
            const booking = await this.repository.save(entity)
            return booking
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async get(id: number) : Promise<Booking> {
        const booking = await this.repository.find({
            relations: ['tenant', 'property'],
            where: {
                'id': id
            }
        })

        if (booking.length > 0) return booking[0]

        throw new Error(`Booking with id ${id} not found`)
    }

    async update(id: number, bookingData: object) : Promise<UpdateResult> {
        try {
            const entity = Object.assign(new Booking(), bookingData)
            return await this.repository.update({ 'id' : id }, entity)
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id: number) : Promise<DeleteResult> {
        try {
            return await this.repository.delete({ 'id' : id })
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async getList() : Promise<Booking[]> {
        return await this.repository.find({
            relations: ['tenant', 'property']
        })
    }
}

export default BookingService