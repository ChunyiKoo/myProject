"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          firstName: "Helen",
          lastName: "Koo",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          username: "FakeUser1",
          firstName: "Lily",
          lastName: "Smith",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          firstName: "Tom",
          lastName: "Wilson",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "demo3@user.io",
          username: "Demo-lition3",
          firstName: "Julie",
          lastName: "Hsien",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "user4@user.io",
          username: "FakeUser4",
          firstName: "Jim",
          lastName: "Brown",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          email: "user5@user.io",
          username: "FakeUser5",
          firstName: "Mary",
          lastName: "White",
          hashedPassword: bcrypt.hashSync("password5"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "Demo-lition",
            "FakeUser1",
            "FakeUser2",
            "Demo-lition3",
            "FakeUser4",
            "FakeUser5",
          ],
        },
      },
      {}
    );
  },
};
