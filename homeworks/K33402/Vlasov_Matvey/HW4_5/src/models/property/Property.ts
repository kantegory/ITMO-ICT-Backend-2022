import { IsString, Max, Min, validateOrReject } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm"
import Booking from "../bookings/Booking"

@Entity({ name: "property" })
export class Property {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @IsString()
    title!: string

    @Column()
    @IsString()
    description!: string

    @Column()
    @IsString()
    city!: string

    @Column()
    @IsString()
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