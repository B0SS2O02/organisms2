'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('category_lang', [{
      title: 'flowers',
      main_ID: 1,
      body: 'wretytuuigdfhjklkbvnm,1',
      lang: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Svety',
      main_ID: 1,
      body: 'wretytuuigdfhjklkbvnm,1',
      lang: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Gul',
      main_ID: 1,
      body: 'wretytuuigdfhjklkbvnm,1',
      lang: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category_lang', null, {});
  }
};
