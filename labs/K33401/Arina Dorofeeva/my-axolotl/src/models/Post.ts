import { DataTypes } from "@sequelize/core"
import sequelize, { AssociableModel } from "../db"
import type { PostShape } from "./shapes"

class Post extends AssociableModel implements PostShape {
  declare id: number
  declare title: string
  declare link: string
  declare text: string
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    title: {
      type: DataTypes.STRING
    },
    link: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
    sequelize
  }
)

sequelize.associableModels["Post"] = Post

Post.associate = (models) => {
  Post.belongsToMany(models["User"], { through: "Favorites" })
}

export default Post
export type { PostShape }
