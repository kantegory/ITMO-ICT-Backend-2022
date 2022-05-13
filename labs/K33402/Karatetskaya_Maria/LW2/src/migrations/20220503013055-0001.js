'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      firstName: {
        type: Sequelize.DataTypes.STRING
      },
      lastName: {
        type: Sequelize.DataTypes.STRING
      },
      username: {
        unique: true,
        type: Sequelize.DataTypes.STRING
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      password: {
        type: Sequelize.DataTypes.STRING
      },
      createdAt: false,
      updatedAt: false
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("Users");
  }
};
