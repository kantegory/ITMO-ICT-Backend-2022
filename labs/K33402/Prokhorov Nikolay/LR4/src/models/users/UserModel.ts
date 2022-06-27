import {
    BeforeCreate,
    BeforeUpdate,
    Column,
    Model,
    Table,
    Unique,
} from 'sequelize-typescript'
import hashPassword from '../../utils/hashPassword'

@Table
export default class UserModel extends Model {
    @Column({ allowNull: false })
    firstName: string

    @Column({ allowNull: false })
    lastName: string

    @Unique
    @Column({ allowNull: false })
    email: string

    @Column({ allowNull: false })
    password: string

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: UserModel) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = hashPassword(password)
        }
    }

    toJSON() {
        const data = super.toJSON()
        delete data.password
        return data
    }
}
