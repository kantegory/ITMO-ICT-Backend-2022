'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'Users', // table name
      'birthday', // new field name
      {
        type: Sequelize.DATE,
      },
    );
    await queryInterface.addColumn(
      'Users', // table name
      'nationality', // new field name
      {
        type: Sequelize.STRING,
      },
    );
    await queryInterface.addColumn(
      'Users', // table name
      'passport', // new field name
      {
        type: Sequelize.STRING,
      },
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'birthday');
    await queryInterface.removeColumn('Users', 'nationality');
    await queryInterface.removeColumn('Users', 'passport');
  }
};
