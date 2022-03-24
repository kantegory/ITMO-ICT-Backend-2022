'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'gender');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
