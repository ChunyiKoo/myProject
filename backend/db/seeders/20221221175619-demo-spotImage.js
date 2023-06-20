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
  options.tableName = "SpotImages";
  return queryInterface.bulkInsert(
   options,
   [
    {
     key: "farm_cottage_1.jpg",
     preview: true,
     spotId: 1,
    },
    {
     key: "beach_house_1.jpg",
     preview: true,
     spotId: 2,
    },
    {
     key: "lake_view_glen_1.jpg",
     preview: true,
     spotId: 3,
    },
    {
     key: "ybor_fall_1.jpg",
     preview: true,
     spotId: 4,
    },
    {
     key: "mountain_house_1.jpg",
     preview: true,
     spotId: 5,
    },
    {
     key: "historic_house_1.jpg",
     preview: true,
     spotId: 6,
    },
    {
     key: "romantic_getaway_1.jpg",
     preview: true,
     spotId: 7,
    },
    {
     key: "endless_summer_1.jpg",
     preview: true,
     spotId: 8,
    },
    {
     key: "lake_cabin_1.jpg",
     preview: true,
     spotId: 9,
    },
    {
     key: "home_sandiego_1.jpg",
     preview: true,
     spotId: 10,
    },
    {
     key: "riverfront_house_1.jpg",
     preview: true,
     spotId: 11,
    },
    {
     key: "home_oroville_1.jpg",
     preview: true,
     spotId: 12,
    },
    {
     key: "farm_cottage_2.jpg",
     preview: false,
     spotId: 1,
    },
    {
     key: "farm_cottage_3.jpg",
     preview: false,
     spotId: 1,
    },
    {
     key: "farm_cottage_4.jpg",
     preview: false,
     spotId: 1,
    },
    {
     key: "farm_cottage_5.jpg",
     preview: false,
     spotId: 1,
    },
    {
     key: "beach_house_2.jpg",
     preview: false,
     spotId: 2,
    },
    {
     key: "beach_house_3.jpg",
     preview: false,
     spotId: 2,
    },
    {
     key: "beach_house_4.jpg",
     preview: false,
     spotId: 2,
    },
    {
     key: "beach_house_5.jpg",
     preview: false,
     spotId: 2,
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
  options.tableName = "SpotImages";
  await queryInterface.bulkDelete(options, null, {});
  // const Op = Sequelize.Op;
  // return queryInterface.bulkDelete(
  //   options,
  //   {
  //     url: {
  //       [Op.in]: [
  //         "www.spotImageurl1.com",
  //         "www.spotImageurl2.com",
  //         "www.spotImageurl3.com",
  //       ],
  //     },
  //   },
  //   {}
  // );
 },
};
