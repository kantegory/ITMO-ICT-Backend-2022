import { Max, Min, validateOrReject } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm"
import Booking from "../bookings/Booking"

@Entity({ name: "property" })
export class Property {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    description!: string

    @Column()
    city!: string

    @Column()
    address!: string

    @Column()
    @Min(1)
    @Max(100)
    guestLimit!: number

    @Column()
    @Min(1)
    @Max(100000)
    price!: number

    @OneToMany(() => Booking, booking => booking.property)
    bookings!: Booking[]

    @BeforeInsert()
    @BeforeUpdate()
    validate(): Promise<void> {
        return validateOrReject(this)
    }
}

export default Property