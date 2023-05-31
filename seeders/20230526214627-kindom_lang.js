'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kindom_langs', [{
      title: 'Plants',
      main_ID: 1,
      body:'wretytuuigdfhjklkbvnm,1',
      lang:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Rasteniya',
      main_ID: 1,
      body:'wretytuuigdfhjklkbvnm,2',
      lang:2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Osumlik',
      main_ID: 1,
      body:'wretytuuigdfhjklkbvnm,3',
      lang:3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Animals',
      main_ID: 2,
      body:'wretytuuigdfhjklkbvnm,1',
      lang:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Zhywotnye',
      main_ID: 2,
      body:'wretytuuigdfhjklkbvnm,2',
      lang:2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Haywanlar',
      main_ID: 2,
      body:'wretytuuigdfhjklkbvnm,3',
      lang:3,
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('kindom_langs', null, {});
  }
};
