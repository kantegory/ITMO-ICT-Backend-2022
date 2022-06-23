'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      password: '1234GGGg',
      age: 21,
      country: 'USA',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Anna',
      lastName: 'Doe',
      email: 'new@example.com',
      password: '1234GGGgg',
      age: 15,
      country: 'France',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Kim',
      lastName: 'Swan',
      email: 'coalla@example.com',
      password: '1234GGGGg',
      age: 30,
      country: 'Italy',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
