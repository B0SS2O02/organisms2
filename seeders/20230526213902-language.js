'use strict';

/** @type {import('sequelize-cli').Migration} */
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
    await queryInterface.bulkInsert('languages', [{
      title: 'English',
      img: 'public/image/image.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Russian',
      img: 'public/image/image.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Turkmen',
      img: 'public/image/image.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('languages', null, {});
     */
    await queryInterface.bulkDelete('languages', null, {});
  }
};
