'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'firstName', {
            allowNull: false,
            validate: {
                notNull: true,
                isAlpha: true,
                len: [1, 30],
            },
            type: Sequelize.STRING,
        })
        await queryInterface.addColumn('Users', 'lastName', {
            allowNull: false,
            validate: {
                notNull: true,
                isAlpha: true,
                len: [1, 30],
            },
            type: Sequelize.STRING,
        })
        await queryInterface.addColumn('Users', 'middleName', {
            allowNull: false,
            validate: {
                notNull: true,
                isAlpha: true,
                len: [1, 30],
            },
            type: Sequelize.STRING,
        })
        await queryInterface.addColumn('Users', 'passport', {
            allowNull: false,
            validate: {
                notNull: true,
                isAlphanumeric: true,
                len: [8, 8],
            },
            type: Sequelize.STRING,
        })
        await queryInterface.addColumn('Users', 'isAdmin', {
            allowNull: false,
            defaultValue: false,
            type: Sequelize.BOOLEAN,
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Users', 'firstName')
        await queryInterface.removeColumn('Users', 'lastName')
        await queryInterface.removeColumn('Users', 'middleName')
        await queryInterface.removeColumn('Users', 'passport')
        await queryInterface.removeColumn('Users', 'isAdmin')
    },
}
