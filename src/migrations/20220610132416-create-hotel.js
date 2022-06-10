'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Hotels', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notNull: true,
                    len: [1, 50],
                },
            },
            city: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notNull: true,
                    len: [1, 50],
                },
            },
            stars: {
                allowNull: false,
                type: Sequelize.NUMBER,
                validate: {
                    notNull: true,
                    isInt: true,
                    min: 1,
                    max: 5,
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Hotels')
    },
}
