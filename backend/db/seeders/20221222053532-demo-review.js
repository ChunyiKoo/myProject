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
            "Perfect for honeymoons, a romantic evening, peaceful solitude or family time with no distractions. Unique features such as a wrap around deck, covered porch, swing, and in the winter, gas heater, fire pit (fully stocked) only when lots of snow, trap door to the loft which has a view overlooking the entire space are just a few of the unique accommodations you will experience at Papa's treehouse. The location is private, you can't see the main house or any other houses. Enjoy the cool mountain mornings.Please read Other Things To Note under Extra Details",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 1,
          review:
            "My husband and I had a nice stay at the chic La Maison Noire. Very peaceful and quiet retreat after our daily ventures in the LA area. The house was surrounded by beautiful succulent and the interior was clean. Easy and quick communication with Elise and Charles and are very polite. I recommend staying at La Maison Noire. Just remember to bring socks or house slippers, as the floors are concrete and gets cold.",
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
            "For anyone who is looking for a perfect getaway this is the PERFECT HOME. I mean every room was well put, decorated, and beautiful. The space is incredible indoors and outdoors but my favorite part was the glass doors inside the living room that show all the beauty that exists outside from water to trees and blue skies. We enjoyed the patio and hot tub and most especially the view. My family and I had such a great time. Thank you for being attentive to our needs and being so responsive and sweet Shelly!",
          stars: 2,
        },
        {
          userId: 3,
          spotId: 2,
          review:
            "This place is AMAZING. If you’re second guessing or wavering to book, stop right now and BOOK!The views from this deck, the seals that visit, and the birds alone make it worth it. Add in the hot tub, panoramic-ish windows, outstanding living room set up, and the comfiest California king bed you’ve ever slept it - you’ve got your dream vacation.Shelly is an outstanding host and was available for any questions or recommendations. She knows hospitality and takes good care of her guests.We will be back again this winter and definitely in the summer with some friends!",
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
