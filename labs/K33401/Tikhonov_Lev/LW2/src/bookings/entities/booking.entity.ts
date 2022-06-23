import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from 'src/users/entities/user.entity'
import { Hotel } from 'src/hotels/entities/hotel.entity'

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Hotel)
  hotel: Hotel

  @Column()
  peopleCount: number

  @Column({ type: 'timestamp' })
  bookingBegin: Date

  @Column({ type: 'timestamp' })
  bookingEnd: Date
}
