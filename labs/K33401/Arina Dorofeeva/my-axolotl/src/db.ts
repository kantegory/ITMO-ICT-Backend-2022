import { Sequelize, Model } from "@sequelize/core"
import { Dialect } from "@sequelize/core"

class AssociableModel extends Model {
  constructor(...args: any[]) {
    super(...args)
  }
  static associate: (models: AssociableModelDict) => void
}

type AssociableModelDict = { [key: string]: typeof AssociableModel }

class AssociableSequelize extends Sequelize {
  declare associableModels: AssociableModelDict
  declare associate?: () => void
}

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  storage: process.env.DB_STORAGE,
  logging: console.log,
}) as AssociableSequelize

sequelize.associableModels = {}
sequelize.associate = () => {
  Object.values(sequelize.associableModels)
    .forEach((m: typeof AssociableModel) => m.associate(sequelize.associableModels))
  delete sequelize.associate
}

export default sequelize
export { AssociableModel }
