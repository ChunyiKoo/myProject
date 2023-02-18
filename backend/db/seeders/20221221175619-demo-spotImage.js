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
          url: "https://live.staticflickr.com/4141/4911156189_a7aa9837ba_n.jpg",
          preview: true,
          spotId: 1,
        },
        {
          url: "https://live.staticflickr.com/4050/4570420809_4f44ae5dba_n.jpg",
          preview: true,
          spotId: 2,
        },
        {
          url: "https://live.staticflickr.com/4463/37832608796_95253f2aaf_w.jpg",
          preview: true,
          spotId: 3,
        },
        {
          url: "https://live.staticflickr.com/632/22118108975_8c0a9b831b_n.jpg",
          preview: true,
          spotId: 4,
        },
        {
          url: "https://live.staticflickr.com/3775/9290451739_c2a5496b7c_n.jpg",
          preview: true,
          spotId: 5,
        },
        {
          url: "https://live.staticflickr.com/7567/15633164817_65d0bd0f28_w.jpg",
          preview: true,
          spotId: 6,
        },
        {
          url: "https://live.staticflickr.com/5539/10409492284_7ba6ab198d_n.jpg",
          preview: true,
          spotId: 7,
        },
        {
          url: "https://live.staticflickr.com/3408/3442821389_29157c8f32_m.jpg",
          preview: true,
          spotId: 8,
        },
        {
          url: "https://live.staticflickr.com/812/41374481612_f9684ccc6f_n.jpg",
          preview: true,
          spotId: 9,
        },
        {
          url: "https://live.staticflickr.com/8327/8139663274_97279ecec4_n.jpg",
          preview: true,
          spotId: 10,
        },
        {
          url: "https://live.staticflickr.com/2122/2197846858_3fcee061e0_w.jpg",
          preview: true,
          spotId: 11,
        },
        {
          url: "https://live.staticflickr.com/8210/8199527118_280d883944_n.jpg",
          preview: true,
          spotId: 12,
        },
        {
          url: "https://live.staticflickr.com/4141/4911156189_a7aa9837ba_n.jpg",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://live.staticflickr.com/4050/4570420809_4f44ae5dba_n.jpg",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://live.staticflickr.com/4463/37832608796_95253f2aaf_w.jpg",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://live.staticflickr.com/632/22118108975_8c0a9b831b_n.jpg",
          preview: false,
          spotId: 1,
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
