import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes
} from 'sequelize'
import { sequelize } from './index'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>

  declare firstName: string
  declare lastName: string
  declare middleName: string | null
  declare email: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    lastName: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    middleName: {
      type: new DataTypes.STRING(),
      allowNull: true
    },
    email: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'users',
    sequelize
  }
)

;(async () => {
  await sequelize.sync()
})()

export { User }
