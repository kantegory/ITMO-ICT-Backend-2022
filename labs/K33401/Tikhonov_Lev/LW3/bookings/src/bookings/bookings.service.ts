import { Injectable } from '@nestjs/common'
import { CreateBookingDto } from './dto/create-booking.dto'
import { UpdateBookingDto } from './dto/update-booking.dto'
import { Repository } from 'typeorm'
import { Booking } from './entities/booking.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Hotel } from '../hotels/entities/hotel.entity'
import { User } from '../users/entities/user.entity'

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(Hotel)
    private hotelsRepository: Repository<Hotel>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create({ user, hotel, ...booking }: CreateBookingDto) {
    const userEntity = await this.usersRepository.findOneBy({ id: user })
    const hotelEntity = await this.hotelsRepository.findOneBy({ id: hotel })
    const newBooking = await this.bookingsRepository.save({
      user: userEntity,
      hotel: hotelEntity,
      ...booking,
    })
    return this.bookingsRepository.findOne({
      relations: ['user', 'hotel'],
      where: { id: newBooking.id },
    })
  }

  findAll() {
    return this.bookingsRepository.find({ relations: ['user', 'hotel'] })
  }

  findOne(id: number) {
    return this.bookingsRepository.findOne({
      relations: ['user', 'hotel'],
      where: { id },
    })
  }

  async update(id: number, { user, hotel, ...booking }: UpdateBookingDto) {
    const userEntity = await this.usersRepository.findOneBy({ id: user })
    const hotelEntity = await this.hotelsRepository.findOneBy({ id: hotel })
    const newBooking = await this.bookingsRepository.save({
      user: userEntity,
      hotel: hotelEntity,
      ...booking,
      id,
    })
    return this.bookingsRepository.findOne({
      relations: ['user', 'hotel'],
      where: { id: newBooking.id },
    })
  }

  remove(id: number) {
    return this.bookingsRepository.delete(id)
  }
}
