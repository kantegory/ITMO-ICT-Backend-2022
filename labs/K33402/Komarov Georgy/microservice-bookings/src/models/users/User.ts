import {
    Table,
    Column,
    Model,
    Unique,
    AllowNull,
    BeforeCreate,
    BeforeUpdate,
    IsEmail,
    IsAlpha,
    NotNull,
    Length, IsAlphanumeric, Default,
} from 'sequelize-typescript'
import hashPassword from '../../utils/hashPassword'

@Table
class User extends Model {
    @IsEmail
    @AllowNull(false)
    @Unique
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @Length({ min: 1, max: 30 })
    @IsAlpha
    @NotNull
    @AllowNull(false)
    @Column
    firstName: string

    @Length({ min: 1, max: 30 })
    @IsAlpha
    @NotNull
    @AllowNull(false)
    @Column
    lastName: string

    @Length({ min: 1, max: 30 })
    @IsAlpha
    @NotNull
    @AllowNull(false)
    @Column
    middleName: string

    @Length({ min: 10, max: 10 })
    @IsAlphanumeric
    @NotNull
    @AllowNull(false)
    @Column
    passport: string

    @Default(false)
    @AllowNull(false)
    @Column
    isAdmin: boolean

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = hashPassword(password)
        }
    }

    toJSON(): User {
        const user = super.toJSON()
        // Remove password from JSON representation
        delete user.password
        return user
    }
}

export default User
