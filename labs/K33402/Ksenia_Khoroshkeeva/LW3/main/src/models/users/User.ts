import {
    Table,
    Column,
    Model,
    Unique,
    AllowNull,
    IsEmail,
    BeforeCreate,
    BeforeUpdate,
    BeforeValidate,
    DefaultScope,
    Scopes
} from "sequelize-typescript";
import hashPassword from "../../utils/hashPassword";

@DefaultScope(() => ({
    attributes: ['id', 'name', 'email']
}))
@Scopes(() => ({
    full: {
        attributes: ['id', 'name', 'email', 'password']
    }
}))
@Table
class User extends Model {
    @AllowNull(false)
    @Column
    name: string;

    @IsEmail
    @AllowNull(false)
    @Unique
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        // Хэширование пароля
        const {password} = instance;

        if (instance.changed('password')) {
            instance.password = hashPassword(password);
        }
    }

    @BeforeValidate
    static checkEmailChanged(instance: User) {
        // Проверка что пользователь не пытается изменить почту
        if (instance.isNewRecord) {
            return;
        }
        if (instance.changed('email')) {
            throw new Error('Нельзя менять электронную почту уже созданного пользователя');
        }
    }
}

export default User;
