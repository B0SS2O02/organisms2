'use strict';
const {
  Model
} = require('sequelize');
const kindoms = require('./kindoms');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categories.belongsTo(models.kindoms, {
        foreignKey: 'kindom'
      })
      models.kindoms.hasMany(categories, {
        foreignKey: 'kindom'
      })
      categories.hasMany(models.kindoms, {
        foreignKey: 'kindom'
      })
    }
  }

  categories.init({
    name: DataTypes.STRING,
    kindom: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};