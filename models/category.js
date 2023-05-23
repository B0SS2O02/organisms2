'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.Kindoms, {
        foreignKey: "kindom"
      })
      models.Kindoms.hasMany(Category, {
        foreignKey: "kindom"
      })
    }
  }
  Category.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    body: DataTypes.TEXT,
    kindom: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};