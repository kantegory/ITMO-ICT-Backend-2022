import { User } from '../../users/entities/user.entity'
import { Hotel } from '../../hotels/entities/hotel.entity'
import {Column} from "typeorm";

export class CreateBookingDto {
  user!: number

  hotel!: number

  guestsCount!: number

  bookingBegin!: Date

  bookingEnd!: Date
}
