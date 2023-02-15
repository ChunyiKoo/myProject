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
     */ options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          url: "https://live.staticflickr.com/4141/4911156189_a7aa9837ba_n.jpg",
        },
        {
          reviewId: 2,
          url: "https://live.staticflickr.com/632/22118108975_8c0a9b831b_n.jpg",
        },
        {
          reviewId: 3,
          url: "https://live.staticflickr.com/4050/4570420809_4f44ae5dba_n.jpg",
        },
        {
          reviewId: 4,
          url: "https://live.staticflickr.com/4463/37832608796_95253f2aaf_w.jpg",
        },
        {
          reviewId: 5,
          url: "https://live.staticflickr.com/3775/9290451739_c2a5496b7c_n.jpg",
        },
        {
          reviewId: 6,
          url: "https://live.staticflickr.com/7567/15633164817_65d0bd0f28_w.jpg",
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
    options.tableName = "ReviewImages";
    await queryInterface.bulkDelete(options, null, {});
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(
    //   options,
    //   {
    //     url: {
    //       [Op.in]: [
    //         "www.reviewImage1.com",
    //         "www.reviewImage2.com",
    //         "www.reviewImage3.com",
    //       ],
    //     },
    //   },
    //   {}
    // );
  },
};
