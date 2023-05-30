'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('organism_langs', [{
      title: 'Rose',
      main_ID: 1,
      lang: 1,
      body:'sdfgfhj quwfuhi uhwoiu',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Roza',
      main_ID: 1,
      lang: 2,
      body:'sdfgfhj quwfuhi uhwoiu',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Roza',
      main_ID: 1,
      lang: 3,
      body:'sdfgfhj quwfuhi uhwoiu',
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('organism_langs', null, {});

  }
};
