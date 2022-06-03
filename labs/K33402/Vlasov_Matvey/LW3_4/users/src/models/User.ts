import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"
import { IsEmail, IsString, validateOrReject } from 'class-validator'
import hashPassword from '../utils/hashPassword'

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @IsString()
    firstName!: string

    @Column()
    @IsString()
    lastName!: string

    @Column({ unique: true })
    @IsEmail()
    email!: string

    @Column()
    @IsString()
    password!: string

    @BeforeInsert()
    @BeforeUpdate()
    generatePasswordHash() {
        this.password = hashPassword(this.password)
    }

    @BeforeInsert()
    validateOnInsert(): Promise<void> {
        return validateOrReject(this)
    }

    @BeforeUpdate()
    validateOnUpdate(): Promise<void> {
        return validateOrReject(this)
    }
}

export default User