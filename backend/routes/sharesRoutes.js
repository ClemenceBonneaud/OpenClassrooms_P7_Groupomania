const express = require("express");
const router = express.Router();

const shareCtrl = require("../controllers/shares");
const auth = require("../middleware/auth");

router.get("/", auth, shareCtrl.getAllShares);

module.exports = router;