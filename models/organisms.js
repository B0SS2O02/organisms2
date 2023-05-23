'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organisms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      organisms.belongsTo(models.categories, {
        foreignKey: 'category'
      })
      models.categories.hasMany(organisms, {
        foreignKey: 'category'
      })
      organisms.hasMany(models.categories, {
        foreignKey: 'category'
      })
    }
  }
  organisms.init({
    name: DataTypes.STRING,
    info: DataTypes.TEXT,
    img: DataTypes.STRING,
    category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'organisms',
  });
  return organisms;
};