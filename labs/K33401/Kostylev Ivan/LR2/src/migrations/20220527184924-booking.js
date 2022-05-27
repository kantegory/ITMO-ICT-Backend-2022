'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, 
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            schema: 'User'
          },
          key: 'id'
        },
        allowNull: false
      },
      roomId: {
        type: Sequelize.NUMBER,
        references: {
          model: {
            tableName: 'Rooms',
            schema: 'Room'
          },
          key: 'id'
        },
        allowNull: false
      },
      checkinDate: {
        type: Sequelize.DATE
      },
      checkoutDate: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};
