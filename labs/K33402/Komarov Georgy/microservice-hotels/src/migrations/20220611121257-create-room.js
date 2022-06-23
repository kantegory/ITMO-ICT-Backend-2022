'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Rooms', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            hotelId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Hotels',
                    },
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            capacity: {
                allowNull: false,
                type: Sequelize.INTEGER,
                validate: {
                    notNull: true,
                    isInt: true,
                    min: 1,
                },
            },
            price: {
                allowNull: false,
                type: Sequelize.DECIMAL,
                validate: {
                    notNull: true,
                    min: 0.01,
                },
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notNull: true,
                    len: [1, 255],
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
        await queryInterface.dropTable('Rooms')
    },
}
