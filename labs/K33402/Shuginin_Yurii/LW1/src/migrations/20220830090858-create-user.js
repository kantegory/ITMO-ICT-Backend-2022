'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      firstName: {
        type: Sequelize.DataTypes.STRING
      },
      lastName: {
        type: Sequelize.DataTypes.STRING
      },
      birthday: {
        type: Sequelize.DataTypes.DATE
      },
      nationality: {
        type: Sequelize.DataTypes.STRING
      },
      passport: {
        unique: true,
        type: Sequelize.DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
