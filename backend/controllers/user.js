const bcrypt = require("bcrypt");
const asyncLib = require("async");

const jwtUtils = require("../utils/jwt.utils");
const models = require("../models");

exports.signup = async (req, res, next) => {
  // Récupération des données
  var email = req.body.email;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var job = req.body.job;

  // Vérification présence des données
  if (
    email == null ||
    password == null ||
    firstName == null ||
    lastName == null ||
    job == null
  ) {
    return res
      .status(400)
      .json({ error: "tous les champs ne sont pas remplis" });
  }

  // Vérification regex
  let regName = new RegExp(
    "^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"
  );
  let regEmail = new RegExp("[a-z0-9]+@[a-z]+[.]+[a-z]{2,3}");

  let testEmail = regEmail.exec(email);
  let testFirstName = regName.exec(firstName);
  let testLastName = regName.exec(lastName);
  let testJob = regName.exec(job);

  if (
    testEmail == null ||
    testFirstName == null ||
    testLastName == null ||
    testJob == null
  ) {
    return res
      .status(400)
      .json({ error: "les champs ne sont pas correctement remplis" });
  }

  // Vérification de la présence de l'email dans la db
  models.User.findOne({
    attributes: ["email"],
    where: { email: email },
  })
    .then(function (userFound) {
      if (!userFound) {
        bcrypt.hash(password, 10, function (err, hash) {
          var newUser = models.User.create({ // Hashage du mot de passe et création de l'utilisateur
            email: email,
            password: hash,
            firstName: firstName,
            lastName: lastName,
            job: job,
            isAdmin: false,
          })
            .then(function (newUser) {
              return res.status(201).json({
                userId: newUser.id,
                token: jwtUtils.generateTokenForUser(newUser),
                isAdmin: newUser.isAdmin,
              });
            })
            .catch(function (err) {
              return res
                .status(500)
                .json({ error: "l'utilisateur ne peut être ajouté" });
            });
        });
      } else {
        return res.status(409).json({ error: "l'utilisateur existe déjà" });
      }
    })
    .catch(function (err) {
      return res
        .status(500)
        .json({ error: "le serveur ne peut pas vérifier l'utilisateur" });
    });
};

exports.login = (req, res, next) => {
  // Récupération des données
  var email = req.body.email;
  var password = req.body.password;

  // Vérification de la présence des données
  if (email == null || password == null) {
    return res.status(400).json({ error: "des paramètres soient manquants" });
  }

  // Vérification regex de l'email
  let regEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  let testEmail = regEmail.exec(email);
  if (testEmail == null) {
    return res.status(400).json({ error: "l'email n'est pas valide" });
  }

  // Vérification de l'existence de l'utilisateur
  models.User.findOne({
    where: { email: email },
  })
    .then((user) => {
      // Comparaison du mot de passe
      if (user) {
        bcrypt.compare(
          password,
          user.password,
          function (errBycrypt, resBycrypt) {
            if (resBycrypt) {
              return res.status(200).json({
                userId: user.id,
                token: jwtUtils.generateTokenForUser(user),
                isAdmin: user.isAdmin,
              });
            } else {
              return res
                .status(403)
                .json({ error: "le mot de passe est incorrecte" });
            }
          }
        );
      } else {
        return res
          .status(404)
          .json({ error: "l'utilisateur n'a pas été trouvé" });
      }
    })
    .catch((error) =>
      res
        .status(500)
        .json({ error: "le serveur ne peut pas vérifier l'utilisateur" })
    );
};

exports.getProfil = (req, res, next) => {
  // Vérification de la présence de l'id dans la db
  models.User.findOne({
    attributes: ["id", "firstName", "lastName", "job"],
    where: { id: req.params.id },
  })
    .then(function (userFound) {
      if (userFound) {
        return res.status(200).json({ userFound });
      } else {
        return res.status(409).json({ error: "l'utilisateur n'existe plus" });
      }
    })
    .catch(function (err) {
      return res
        .status(500)
        .json({ error: "le serveur n'a pas trouvé l'utilisateur" });
    });
};

exports.modifyAccount = (req, res, next) => {
  // Récupération des données
  var email = req.body.email;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var job = req.body.job;

  // Vérification présence des données
  if (
    password == null ||
    firstName == null ||
    lastName == null ||
    job == null
  ) {
    return res
      .status(400)
      .json({ error: "tous les champs ne sont pas remplis" });
  }

  // Vérification regex
  let regName = new RegExp(
    "^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"
  );

  let testFirstName = regName.exec(firstName);
  let testLastName = regName.exec(lastName);
  let testJob = regName.exec(job);

  if (testFirstName == null || testLastName == null || testJob == null) {
    return res
      .status(400)
      .json({ error: "les champs ne sont pas correctement remplis" });
  }

  // Vérification de la présence de l'id dans la db
  models.User.findOne({
    attributes: ["id"],
    where: { id: req.params.id },
  })
    .then(function (userFound) {
      if (userFound) {
        bcrypt.hash(password, 10, function (err, hash) {
          var updatedUser = models.User.update( // hashage du mot de passe et mise à jour de l'utilisateur
            {
              password: hash,
              firstName: firstName,
              lastName: lastName,
              job: job,
              isAdmin: false,
            },
            { where: { id: req.params.id } }
          )
            .then(function (updatedUser) {
              console.log("modifié");
              return res.status(201).json({
                userId: updatedUser.id,
                userFirstName: updatedUser.firstName,
                userLastName: updatedUser.lastName,
                userJob: updatedUser.job,
                message: "L'utilisateur a bien été modifié",
              });
            })
            .catch(function (err) {
              console.log("pas modifié");
              return res
                .status(500)
                .json({ error: "l'utilisateur ne peut être modifié" });
            });
        });
      } else {
        return res.status(409).json({ error: "l'utilisateur n'existe pas" });
      }
    })
    .catch(function (err) {
      return res
        .status(500)
        .json({ error: "le serveur n'a pas trouvé l'utilisateur" });
    });
};

exports.deleteAccount = (req, res, next) => {
  asyncLib.waterfall(
    [
      function (done) {
        // Récupération de tous les articles publiés par l'utilisateur
        models.Article.findAll({
          where: { userId: req.params.id },
        })
          .then(function (articlesFound) {
            done(null, articlesFound);
          })
          .catch((error) => {
            return res.status(500).json(error);
          });
      },
      function (articlesFound, done) {
        if(articlesFound != 0) {
          for (article of articlesFound) {
            let articleId = article.id;
  
            // Suppression des articles de l'utilisateur qui ont été partagés
            models.Share.destroy({
              where: { articleId: articleId },
            })
              .then(() => {
                done(null);
              })
              .catch((error) => {
                return res.status(500).json(error);
              });
          }
        } else {
          done(null);
        }
      },
      function (done) {
        // Suppression des partages de l'utilisateur
        models.Share.destroy({
          where: { userId: req.params.id },
        })
          .then(function () {
            done(null);
          })
          .catch((error) => {
            return res.status(500).json(error);
          });
      },
      function (done) {
        // Suppression des articles publiés par l'utilisateur
        models.Article.destroy({
          where: { userId: req.params.id },
        })
          .then(function () {
            done("done");
          })
          .catch((error) => {
            return res.status(500).json(error);
          });
      },
    ],
    function (done) {
      console.log(done);
      // Suppression du compte de l'utilisateur
      models.User.destroy({
        where: { id: req.params.id },
      })
        .then(function () {
          return res
            .status(200)
            .json({ message: "L'utilisateur a bien été supprimé" });
        })
        .catch(function (error) {
          return res.status(500).json(error);
        });
    }
  );
};