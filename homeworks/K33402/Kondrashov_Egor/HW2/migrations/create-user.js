'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            uuid: {
                type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            email: Sequelize.STRING(127),
            firstName: { type: Sequelize.STRING(127), allowNull: true },
            middleName: { type: Sequelize.STRING(127), allowNull: true },
            lastName: { type: Sequelize.STRING(127), allowNull: true },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
            isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
            isVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};
