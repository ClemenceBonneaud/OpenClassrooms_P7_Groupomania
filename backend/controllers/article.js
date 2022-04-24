const asyncLib = require("async");

const jwtUtils = require("../utils/jwt.utils");
const models = require("../models");


exports.createArticle = (req, res, next) => {
  // Récupération des informations user
  let headerAuth = req.headers["authorization"];
  let userId = jwtUtils.getUserId(headerAuth);

  // Vérification des éléments de l'article
  let title = req.body.title;
  let content = req.body.content;

  if (title == null || content == null) {
    return res
      .status(400)
      .json({ error: "certains champs ne sont pas remplis" });
  }

  if (title.length <= 2 || content.length <= 4) {
    return res.status(400).json({ error: "certains champs sont trop courts" });
  }

  // Enregistrement des éléments
  asyncLib.waterfall(
    [
      function (done) {
        // Récupération des données de l'utilisateur
        models.User.findOne({
          where: { id: userId },
        })
          .then(function (userFound) {
            done(null, userFound);
          })
          .catch(function (error) {
            return res
              .status(500)
              .json({ error: "l'utilisateur n'a pas été trouvé" });
          });
      },
      function (userFound, done) {
        if (userFound) {
          // Création de l'article
          models.Article.create({
            title: title,
            text: content,
            shares: 0,
            UserId: userFound.id,
          }).then(function (newArticle) {
            done(newArticle);
          });
        } else {
          res.status(404).json({ error: "l'utilisateur n'a pas été trouvé" });
        }
      },
    ],
    function (newArticle) {
      if (newArticle) {
        return res.status(201).json(newArticle);
      } else {
        return res
          .status(500)
          .json({ error: "l'article n'as pas pu être posté" });
      }
    }
  );
};

exports.deleteArticle = (req, res, next) => {
  // Suppression des partages de l'article
  models.Share.destroy({
    where: { articleId: req.params.id }
  })
  .then(() => {
    // Suppression de l'article
    models.Article.destroy({
      where: { id: req.params.id },
    })
      .then(() => {
        return res.status(201).json({ message: "l'article a bien été supprimé" });
      })
      .catch((error) => {
        return res.status(500).json({ error: "l'article n'a pas pu être supprimé" });
      });
  })
  .catch((error) => {
    return res.status(500).json({ error: "le partage de l'article n'a pas pu être supprimé" });
  })
  
};

exports.getAllArticles = (req, res, next) => {
  let fields = req.query.fields;
  let order = req.query.order;

  models.Article.findAll({
    order: [order != null ? order.split(":") : ["createdAt", "DESC"]], // Ordre du plus récent au plus ancien
    attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    include: [
      {
        model: models.User,
        attributes: ["firstName"],
      },
    ],
  })
    .then(function (articles) {
      if (articles) {
        res.status(200).json(articles);
      } else {
        res
          .status(404)
          .json({ error: "Il n'y a pas encore d'articles à afficher" });
      }
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ error: "champs non valides" });
    });
};

exports.getPersonsArticles = (req, res, next) => {
  let fields = req.query.fields;
  let order = req.query.order;

  models.Article.findAll({
    where: { userId: req.params.id },
    order: [order != null ? order.split(":") : ["createdAt", "DESC"]], // ordre du plus récent au plus ancien
    attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    include: [
      {
        model: models.User,
        attributes: ["firstName"],
      },
    ],
  })
    .then(function (articles) {
      if (articles) {
        res.status(200).json(articles);
      } else {
        res
          .status(404)
          .json({ error: "Il n'y a pas encore d'articles à afficher" });
      }
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ error: "champs non valides" });
    });
};

exports.shareArticle = (req, res, next) => {
  // Récupération des données
  var articleId = req.params.id;
  var userId = req.body.userId;
  var comment = req.body.comment;

  // Vérification présence des données
  if (userId == null || comment == null) {
    return res
      .status(400)
      .json({ error: "tous les champs ne sont pas remplis" });
  }

  // Création d'un article partagé
  models.Share.create({
    userId: userId,
    articleId: articleId,
    comment: comment
  })
  .then(() => {
    models.Article.increment( { shares: 1 }, { where: { id: articleId } }) // Ajout de 1 au compte de partages de l'article d'origine
    .then(() => {
      return res.status(200).json({ message: "le partage a bien été pris en compte" })
    })
    .catch((error) => {
      return res.status(500).json({ error: "le compte du partage n'a pas été pris en compte" })
    })
  })
  .catch((error) => {
    return res.status(500).json({ error: "le partage n'a pas été pris en compte" })
  })
};