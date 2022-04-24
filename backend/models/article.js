'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) { // relations entre models
      models.Article.belongsTo(models.User, { // Chaque article appartient à un utilisateur
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Article.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    shares: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};