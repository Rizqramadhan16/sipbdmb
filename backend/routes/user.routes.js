const express    = require('express');
const router     = express.Router();
const userCtrl   = require('../controllers/user.controller');
const auth       = require('../middlewares/auth.middleware');
const role       = require('../middlewares/role.middleware');

router.get('/',                 auth, role('admin'), userCtrl.getAll);
router.put('/:id/password',     auth, role('admin'), userCtrl.resetPassword);
router.put('/:id/role',         auth, role('admin'), userCtrl.changeRole);

module.exports = router;