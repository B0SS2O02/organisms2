'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organism extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organism.belongsTo(models.Category, {
        foreignKey: "category"
      })
      models.Category.hasMany(Organism, {
        foreignKey: "category"
      })
    }
  }
  Organism.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    body: DataTypes.TEXT,
    category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Organism',
  });
  return Organism;
};