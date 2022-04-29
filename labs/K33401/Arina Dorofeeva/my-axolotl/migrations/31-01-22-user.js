const up = async (queryInterface, Sequelize) => {
  queryInterface.createTable("User", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    username: {
      type: Sequelize.DataTypes.STRING
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    }
  })
}

const down = async (queryInterface) => {
  queryInterface.dropTable("User")
}

module.exports = {
  up,
  down
}
