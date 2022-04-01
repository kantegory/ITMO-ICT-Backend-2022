import { DataTypes, Model } from "@sequelize/core"
import bcrypt from "bcrypt"
import sequelize from "../db"

export type UserShape = {
  id?: number
  username: string
  password: string
}

class User extends Model implements UserShape {
  declare id: number
  declare username: string
  declare password: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      set(value: string) {
        this.setDataValue("password", bcrypt.hashSync(value, 10))
      }
    }
  },
  {
    freezeTableName: true,
    sequelize
  }
)

export default User
