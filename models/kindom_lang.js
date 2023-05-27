'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kindom_lang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      kindom_lang.belongsTo(models.kindom, {
        foreignKey: 'main_ID'
      })
      models.kindom.hasMany(kindom_lang, {
        foreignKey: 'main_ID'
      })
      kindom_lang.belongsTo(models.language, {
        foreignKey: 'lang'
      })
      models.language.hasMany(kindom_lang, {
        foreignKey: 'lang'
      })
      kindom_lang.hasMany(models.language, {
        foreignKey: 'lang'
      })
    }
  }
  kindom_lang.init({
    main_ID: DataTypes.INTEGER,
    lang: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kindom_lang',
  });
  return kindom_lang;
};