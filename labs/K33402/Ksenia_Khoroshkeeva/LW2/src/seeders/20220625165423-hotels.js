'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Hotels', [
      {name: 'Hotel A', city: 'Paris', stars: 5, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Hotel B', city: 'London', stars: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Hotel C', city: 'Paris', stars: 5, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Hotel D', city: 'London', stars: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Hotel E', city: 'Paris', stars: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Hotel F', city: 'Berlin', stars: 5, createdAt: new Date(), updatedAt: new Date()}
    ]);
    await queryInterface.bulkInsert('Rooms', [
      {hotelId: 1, name: 'Super deluxe', capacity: 2, price: 10000, createdAt: new Date(), updatedAt: new Date()},
      {hotelId: 1, name: 'Deluxe', capacity: 2, price: 5000, createdAt: new Date(), updatedAt: new Date()},
      {hotelId: 2, name: 'Family room', capacity: 4, price: 3000, createdAt: new Date(), updatedAt: new Date()},
      {hotelId: 2, name: 'Single room', capacity: 1, price: 1500, createdAt: new Date(), updatedAt: new Date()},
      {hotelId: 3, name: 'Presidential', capacity: 2, price: 40000, createdAt: new Date(), updatedAt: new Date()},
      {hotelId: 4, name: 'Economy', capacity: 2, price: 1000, createdAt: new Date(), updatedAt: new Date()},
      {hotelId: 4, name: 'Bed', capacity: 1, price: 300, createdAt: new Date(), updatedAt: new Date()},
      {hotelId: 5, name: 'Super economy', capacity: 2, price: 500, createdAt: new Date(), updatedAt: new Date()},
      {hotelId: 6, name: 'Large room', capacity: 6, price: 7500, createdAt: new Date(), updatedAt: new Date()}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Hotels', null, {});
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};
