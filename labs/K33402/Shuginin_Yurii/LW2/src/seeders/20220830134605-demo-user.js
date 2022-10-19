'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      email: 'demo1@ya.ru',
      password: '12345',
      firstName: 'John',
      lastName: 'Doe',
      birthday: "2003-02-01",
      nationality: 'England',
      passport: '1234567890',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
