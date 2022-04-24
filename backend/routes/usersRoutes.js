const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/infos/:id', auth, userCtrl.getProfil);
router.put('/modify/:id', auth, userCtrl.modifyAccount);
router.delete('/delete/:id', auth, userCtrl.deleteAccount);

module.exports = router;
