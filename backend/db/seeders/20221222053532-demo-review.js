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
            "The location is private, you can't see the main house or any other houses. Enjoy the cool mountain mornings.Please read Other Things To Note under Extra Details",
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
            "We had a wonderful time at Elise’s place. The place is peaceful and quite, well equipped and closer to beaches, and restaurants. The unit is specious, clean and offers an amazing view from the outdoor deck/patio.",
          stars: 3,
        },

        {
          userId: 1,
          spotId: 3,
          review:
            "We enjoyed a restful few days at Shelly’s place! The house is cozy, SPOTLESS, and has a killer view. I would highly recommend as an easy escape from busy city life.",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 1,
          review:
            "For anyone who is looking for a perfect getaway this is the PERFECT HOME.  Thank you for being attentive to our needs and being so responsive and sweet Shelly!",
          stars: 2,
        },
        {
          userId: 3,
          spotId: 2,
          review:
            "This place is AMAZING. If you’re second guessing or wavering to book, stop right now and BOOK!The views from this deck, the seals that visit, and the birds alone make it worth it. !",
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
