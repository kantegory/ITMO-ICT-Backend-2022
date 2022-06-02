"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
            },
            name: Sequelize.DataTypes.STRING,
            email: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
            },
            phone: Sequelize.DataTypes.STRING,
            address: Sequelize.DataTypes.STRING,
            age: Sequelize.DataTypes.INTEGER,
            country: Sequelize.DataTypes.STRING,
            createdAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Users");
    },
};
