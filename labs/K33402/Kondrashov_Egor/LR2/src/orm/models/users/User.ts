import { IsEmail, validateOrReject } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Booking from '../bookings/Booking';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column({
        nullable: true
    })
    name: string;

    @Column({ select: false })
    password: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[]

    @BeforeInsert()
    @BeforeUpdate()
    validate(): Promise<void> {
        return validateOrReject(this);
    }
}

export default User
