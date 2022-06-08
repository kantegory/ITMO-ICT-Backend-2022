'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Films', [{
      title: 'John',
      country: 'USA',
      duration: 120,
      genre: 'Drama',
      ageLimit: 18,
      description: 'Film about John`s life',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Give me cat',
      country: 'Russia',
      duration: 110,
      genre: 'Drama',
      ageLimit: 16,
      description: 'Her ex-boyfriend didn`t want to give cat back',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Sun',
      country: 'Spain',
      duration: 120,
      genre: 'Comedy',
      ageLimit: 0,
      description: 'We love sun',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Teller',
      country: 'USA',
      duration: 150,
      genre: 'Triller',
      ageLimit: 16,
      description: 'Who is he?',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Blood in the water',
      country: 'England',
      duration: 110,
      genre: 'Horror',
      ageLimit: 21,
      description: 'Everyone dies in the end',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Hey Mister',
      country: 'England',
      duration: 100,
      genre: 'Romantic',
      ageLimit: 12,
      description: 'She saw him in the park',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Films', null, {});
  }
};
