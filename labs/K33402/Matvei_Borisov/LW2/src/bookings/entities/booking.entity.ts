import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Hotel } from '../../hotels/entities/hotel.entity'

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Hotel)
  hotel!: Hotel

  @Column()
  guestsCount!: number

  @Column({ type: 'timestamp' })
  bookingBegin!: Date

  @Column({ type: 'timestamp' })
  bookingEnd!: Date
}
