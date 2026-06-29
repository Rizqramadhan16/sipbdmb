const express    = require('express');
const router     = express.Router();
const dosenCtrl  = require('../controllers/dosen.controller');
const auth       = require('../middlewares/auth.middleware');
const role       = require('../middlewares/role.middleware');

router.get('/',       auth, role('admin'), dosenCtrl.getAll);
router.get('/:id',    auth, role('admin'), dosenCtrl.getById);
router.post('/',      auth, role('admin'), dosenCtrl.create);
router.put('/:id',    auth, role('admin'), dosenCtrl.update);
router.delete('/:id', auth, role('admin'), dosenCtrl.remove);

module.exports = router;