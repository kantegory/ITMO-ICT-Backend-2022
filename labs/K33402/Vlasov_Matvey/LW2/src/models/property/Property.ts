import { IsInt, Max, Min, validateOrReject } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"

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

    @BeforeInsert()
    @BeforeUpdate()
    validate(): Promise<void> {
        return validateOrReject(this)
    }
}

export default Property