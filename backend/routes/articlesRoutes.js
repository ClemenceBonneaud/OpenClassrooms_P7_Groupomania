const express = require("express");
const router = express.Router();

const articleCtrl = require("../controllers/article");
const auth = require("../middleware/auth");

router.post("/", auth, articleCtrl.createArticle);
router.post("/:id/share", auth, articleCtrl.shareArticle);
router.delete("/:id", auth, articleCtrl.deleteArticle);
router.get("/", auth, articleCtrl.getAllArticles);
router.get("/:id", auth, articleCtrl.getPersonsArticles);

module.exports = router;