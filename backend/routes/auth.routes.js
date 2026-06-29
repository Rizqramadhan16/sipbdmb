const express    = require('express');
const router     = express.Router();
const authCtrl   = require('../controllers/auth.controller');
const auth       = require('../middlewares/auth.middleware');

router.post('/login',  authCtrl.login);
router.post('/logout', auth, authCtrl.logout);
router.get('/profile', auth, authCtrl.profile);

module.exports = router;