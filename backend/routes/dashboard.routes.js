const express     = require('express');
const router      = express.Router();
const dashCtrl    = require('../controllers/dashboard.controller');
const auth        = require('../middlewares/auth.middleware');

router.get('/', auth, dashCtrl.index);

module.exports = router;