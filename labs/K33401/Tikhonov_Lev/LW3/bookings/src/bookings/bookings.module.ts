import { Module } from '@nestjs/common'
import { BookingsService } from './bookings.service'
import { BookingsController } from './bookings.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Booking } from './entities/booking.entity'
import { User } from '../users/entities/user.entity'
import { Hotel } from '../hotels/entities/hotel.entity'

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [TypeOrmModule.forFeature([Booking, User, Hotel])],
})
export class BookingsModule {}
