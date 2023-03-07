import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    address!: string

    @Column({ type: `float`, nullable: true })
    rating: number

    @Column({ nullable: true })
    description!: string

    @Column()
    capacity!: number
}