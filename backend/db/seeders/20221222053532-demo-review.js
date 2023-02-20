"use strict";

/** @type {import('sequelize-cli').Migration} */

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
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          spotId: 3,
          review:
            "The location is private, you can't see the main house or any other houses. ",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 1,
          review:
            " I recommend staying at La Maison Noire. Just remember to bring socks or house slippers, as the floors are concrete and gets cold.",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 2,
          review:
            "We had a wonderful time at Elise place. The place is peaceful and quite, well equipped and closer to beaches, and restaurants. ",
          stars: 3,
        },

        {
          userId: 1,
          spotId: 3,
          review:
            "We enjoyed a restful few days at Shelly place! The house is cozy, SPOTLESS, and has a killer view. ",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 1,
          review:
            "For anyone who is looking for a perfect getaway this is the PERFECT HOME.  ",
          stars: 2,
        },
        {
          userId: 3,
          spotId: 2,
          review:
            "This place is AMAZING. If you are second guessing or wavering to book, stop right now and BOOK!",
          stars: 3,
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
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(options, null, {});
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(
    //   options,
    //   {
    //     id: { [Op.in]: [1, 2, 3] },
    //   },
    //   {}
    // );
  },
};
