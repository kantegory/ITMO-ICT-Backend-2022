import { IsNotEmpty, IsString, NotContains, validateOrReject } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne } from "typeorm"
import Property from "../property/Property"
import User from "../users/User"

@Entity({ name: "bookings" })
export class Booking {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => User, user => user.bookings)
    @IsNotEmpty()
    tenant!: User

    @ManyToOne(() => Property, property => property.bookings)
    @IsNotEmpty()
    property!: Property

    @Column()
    @NotContains('error')
    checkin!: string

    @Column()
    @NotContains('error')
    checkout!: string

    @BeforeInsert()
    @BeforeUpdate()
    validate(): Promise<void> {
        if (!this.isDate(this.checkin)) {
            this.checkin = 'error'
        }
        if (!this.isDate(this.checkout)) {
            this.checkout = 'error'
        }
        return validateOrReject(this)
    }

    isDate(str: any) : boolean {
        if (typeof(str) != 'string') return false
        return (str.includes('/') || str.includes('-') || str.includes('.')) && !isNaN(Date.parse(str))
    }
}

export default Booking