'use strict';

import {Model, UUIDV4} from 'sequelize'

interface UserAttributes {
    id: string;
    username: string;
    password: string;
    email: string;
    hometown: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes> implements UserAttributes {
        id: string;
        username!: string;
        password!: string;
        email!: string;
        hometown: string;
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
        }
    }

    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hometown: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
