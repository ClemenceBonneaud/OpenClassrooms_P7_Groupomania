const jwt = require('jsonwebtoken');

const GROUPOMANIA_SIGN_SECRET =
  "6fgjs562hdigkn9dnzl79zenmzin52jivhoand61jfzef0273njeia";

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, GROUPOMANIA_SIGN_SECRET);
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        if(req.body.userId && req.body.userId !== userId) {
            throw 'l\'user ID est non valable';
        } else {
            console.log("l'utilisateur est bien identifié !");
            next();
        }
    } catch (error) {
        res.status(403).json({ error: 'la requete est non authentifiée' });
    }
};