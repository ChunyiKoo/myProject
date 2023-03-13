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
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "201 E Randolph St.",
          city: "Chicago",
          state: "Illinois",
          country: "USA",
          lat: 41.3582575,
          lng: -88.7665427,
          name: "Farm Cottage",
          description:
            "Located on a five-acre coastal farm in the quaint, picturesque ocean-side city of Carpinteria, The Avo-Cottage awaits your getaway.",
          price: 213,
        },
        {
          ownerId: 2,
          address: "1 College Cir",
          city: "Bangor",
          state: "Maine",
          country: "USA",
          lat: 42.7645358,
          lng: -71.4730327,
          name: "Beach House",
          description:
            " All the comforts of home but with spectacular views off the direct oceanfront private balcony.  ",
          price: 73,
        },
        {
          ownerId: 3,
          address: "1 Depot St.",
          city: "Marietta",
          state: "GA",
          country: "USA",
          lat: 33.7195358,
          lng: -84.0072019,
          name: "Lake View Glen",
          description:
            "Located on Big Blue's East shore. This one-of-a-kind home is perfect for your family vacation! ",
          price: 59,
        },
        {
          ownerId: 1,
          address: "2512 N 15th St",
          city: "Ybor City",
          state: "FL",
          country: "USA",
          lat: 28.3582575,
          lng: -82.7665427,
          name: "Ybor's Falls",
          description:
            "Stunning south-west views of the lake.  Kayak, fish, boat, snowshoe or just put your feet up by the fire. ",
          price: 113,
        },
        {
          ownerId: 2,
          address: "100 North Blvd",
          city: "Baton Rouge",
          state: "LA",
          country: "USA",
          lat: 30.7645358,
          lng: -91.4730327,
          name: "Mountain House",
          description:
            "Unmatched panoramic views of Great Smoky Mountain national park, including Mt LeConte at 6,593ft, from your back deck!",
          price: 55,
        },
        {
          ownerId: 3,
          address: "417 Coleman Ave",
          city: "Dorrance",
          state: "KS",
          country: "USA",
          lat: 39.7195358,
          lng: -98.0072019,
          name: "Historic House",
          description:
            "the Edna Railhouse is a Modern Farmhouse originally constructed as lodging for the manager of the local Edna Railroad Stop. ",
          price: 96,
        },
        {
          ownerId: 1,
          address: "123 Wall streat",
          city: "Seattle",
          state: "Washington",
          country: "USA",
          lat: 47.3582575,
          lng: -119.7665427,
          name: "Romantic Getaway",
          description:
            "We are located five minutes from the entrance to the Sequoia National Park and within walking distance of local restaurants",
          price: 123,
        },
        {
          ownerId: 2,
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Endless Summer",
          description:
            "This resort includes access to a lakefront boardwalk. It is also within walking distance to the beach with private access.",
          price: 273,
        },
        {
          ownerId: 3,
          address: "548 Vanderbilt Ave",
          city: "Staten island",
          state: "New York",
          country: "USA",
          lat: 40.7195358,
          lng: -74.0072019,
          name: "Lake Cabin",
          description:
            "Enjoy a stay at Stellar Jay Landing with spectacular lake views while grilling up grub on the back deck. ",
          price: 389,
        },
        {
          ownerId: 1,
          address: "123 Mango streat",
          city: "San Diego",
          state: "California",
          country: "USA",
          lat: 31.3582575,
          lng: -119.7665427,
          name: "Home in San Diego",
          description:
            "Luxury meets northwoods rustic charm on this private estate situated on 520 acres just West of Pequot Lakes.",
          price: 93,
        },
        {
          ownerId: 2,
          address: "1555 Happy Lane",
          city: "Silver Mt",
          state: "Idaho",
          country: "USA",
          lat: 75.7645358,
          lng: -155.4730327,
          name: "Riverfront House",
          description:
            "There is a beautiful new gunite pool, large patio, elevated screened in porch, and spacious deck for barbecuing and dining. ",
          price: 55,
        },
        {
          ownerId: 3,
          address: "48 Cherry Street",
          city: "Oroville",
          state: "Michigan",
          country: "USA",
          lat: 76.7195358,
          lng: -156.0072019,
          name: "Home in Oroville",
          description:
            "Hiking and stargazing are truly world-class in this desirable Pipes Canyon locale.",
          price: 76,
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
    options.tableName = "Spots";
    await queryInterface.bulkDelete(options, null, {});
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(
    //   options,
    //   {
    //     name: {
    //       [Op.in]: [
    //         "App Academy 1",
    //         "App Academy 2",
    //         "App Academy 3",
    //         "App Academy 4",
    //         "App Academy 5",
    //         "App Academy 6",
    //       ],
    //     },
    //   },
    //   {}
    // );
  },
};
