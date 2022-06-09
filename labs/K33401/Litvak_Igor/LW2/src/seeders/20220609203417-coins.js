'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Coins', [
            {ticker: 'btc', name: 'Bitcoin', createdAt: new Date(), updatedAt: new Date()},
            {ticker: 'eth', name: 'Ethereum', createdAt: new Date(), updatedAt: new Date()},
            {ticker: 'doge', name: 'Dogecoin', createdAt: new Date(), updatedAt: new Date()}
        ])
    },

    async down(queryInterface, Sequelize) {
         await queryInterface.bulkDelete('Coins', null, {})
    }
}
