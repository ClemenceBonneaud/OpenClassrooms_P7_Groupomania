const jwt = require("jsonwebtoken");

const GROUPOMANIA_SIGN_SECRET =
  "6fgjs562hdigkn9dnzl79zenmzin52jivhoand61jfzef0273njeia";

module.exports = {
  // Création d'un token pour un utilisateur
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin,
      },
      GROUPOMANIA_SIGN_SECRET,
      {
        expiresIn: "12h",
      }
    );
  },

  // Récupération du token
  parseAuthorization: function (authorization) {
    return authorization != null ? authorization.replace("bearer ", "") : null;
  },

  // Récupération de l'userId à partir du token
  getUserId: function (authorization) {
    let userId = -1;
    let token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        let jwtToken = jwt.verify(token, GROUPOMANIA_SIGN_SECRET);
        if (jwtToken != null) {
          userId = jwtToken.userId;
        }
      } catch (error) {
        return error;
      }
    }
    return userId;
  },
};
