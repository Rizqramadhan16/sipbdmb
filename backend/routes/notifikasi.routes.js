const express    = require('express');
const router     = express.Router();
const notifCtrl  = require('../controllers/notifikasi.controller');
const auth       = require('../middlewares/auth.middleware');

router.get('/',           auth, notifCtrl.getAll);
router.put('/read-all',   auth, notifCtrl.markAllRead);
router.put('/:id/read',   auth, notifCtrl.markRead);

module.exports = router;