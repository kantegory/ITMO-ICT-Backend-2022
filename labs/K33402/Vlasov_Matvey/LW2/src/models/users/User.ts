import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"
import { IsEmail, validate, validateOrReject } from 'class-validator'
import hashPassword from '../../utils/hashPassword'
import { ValidationError } from "sequelize/types"

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column({ unique: true })
    @IsEmail()
    email!: string

    @Column()
    password!: string

    @BeforeInsert()
    @BeforeUpdate()
    generatePasswordHash() {
        console.log('generating...')
        if(this.password) this.password = hashPassword(this.password)
    }

    @BeforeInsert()
    validateOnInsert(): Promise<void> {
        return validateOrReject(this)
    }

    @BeforeUpdate()
    validateOnUpdate(): Promise<void> | null {
        if (this.email == undefined) return null
        return validateOrReject(this)
    }
}

export default User