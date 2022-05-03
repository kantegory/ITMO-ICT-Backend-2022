import { DataTypes, Model } from "@sequelize/core"
import sequelize from "../db"

export type UserShape = {
  id?: number
  email: string
  password: string
}

class User extends Model implements UserShape {
  declare id: number
  declare email: string
  declare password: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    sequelize
  }
)

export default User