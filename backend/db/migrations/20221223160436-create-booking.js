"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
 options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable(
   "Bookings",
   {
    id: {
     allowNull: false,
     autoIncrement: true,
     primaryKey: true,
     type: Sequelize.INTEGER,
    },
    spotId: {
     type: Sequelize.INTEGER,
     references: {
      model: "Spots",
      key: "id",
     },
    },
    userId: {
     type: Sequelize.INTEGER,
     references: {
      model: "Users",
      key: "id",
     },
    },
    startDate: {
     allowNull: false,
     type: Sequelize.DATE,
    },
    endDate: {
     allowNull: false,
     type: Sequelize.DATE,
    },
    guests: {
     allowNull: false,
     type: Sequelize.INTEGER,
     validate: {
      min: 1,
     },
    },
    createdAt: {
     allowNull: false,
     type: Sequelize.DATE,
     defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
     allowNull: false,
     type: Sequelize.DATE,
     defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
   },
   options
  );
 },
 async down(queryInterface, Sequelize) {
  options.tableName = "Bookings";
  await queryInterface.dropTable(options);
 },
};
