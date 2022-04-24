const models = require("../models");

exports.getAllShares = (req, res, next) => {
  let fields = req.query.fields;
  let order = req.query.order;

  models.Share.findAll({
    order: [order != null ? order.split(":") : ["createdAt", "DESC"]], // ordre du plus récent au plus ancien
    attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    include: [
      {
        model: models.User, // Récupération des données utilisateur
        as: "user",
      },
      {
        model: models.Article, // Récupération des données article
        as: "article",
      },
    ],
  })
    .then(function (articles) {
      if (articles) {
        console.log(articles);
        return res.status(200).json(articles);
      } else {
        return res
          .status(404)
          .json({ error: "Il n'y a pas encore d'articles à afficher" });
      }
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({ error: "champs non valides" });
    });
};
