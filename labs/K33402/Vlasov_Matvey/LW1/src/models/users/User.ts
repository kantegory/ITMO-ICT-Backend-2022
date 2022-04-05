import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"
import hashPassword from '../../utils/hashPassword'

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column({ unique: true })
    email!: string

    @Column()
    password!: string

    @BeforeInsert()
    @BeforeUpdate()
    static generatePasswordHash(instance: User) {
        console.log("Hash generating...")
        const { password } = instance
        console.log(password)

        instance.password = hashPassword(password)
        console.log(instance.password)
    }
}

export default User