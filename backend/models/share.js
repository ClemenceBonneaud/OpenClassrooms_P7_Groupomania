'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    static associate(models) { // relations entre models
      models.User.belongsToMany(models.Article, { // relation utilisateur - article via share
        through: models.Share,
        foreignKey: 'userId',
        otherKey: 'articleId',
      });
      models.Article.belongsToMany(models.User, { // relation article - utilisateur via share
        through: models.Share,
        foreignKey: 'articleId',
        otherKey: 'userId',
      });
      models.Share.belongsTo(models.User, { // relation share - utilisateur
        foreignKey: 'userId',
        as: 'user',
      });
      models.Share.belongsTo(models.Article, { // relation share - article
        foreignKey: 'articleId',
        as: 'article',
      })
    }
  }
  Share.init({
    articleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Share',
  });
  return Share;
};