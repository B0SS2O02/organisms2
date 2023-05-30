'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category.belongsTo(models.kindom, {
        foreignKey: 'kindom_ID',
        onDelete: 'CASCADE',
        onUpdate: "no action"
      })
      models.kindom.hasMany(category, {
        foreignKey: 'kindom_ID'
      })
      category.hasMany(models.kindom, {
        foreignKey: 'kindom_ID'
      })

    }
  }
  category.init({
    kindom_ID: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};