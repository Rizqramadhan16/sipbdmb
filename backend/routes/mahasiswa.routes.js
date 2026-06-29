const express    = require('express');
const router     = express.Router();
const mhsCtrl    = require('../controllers/mahasiswa.controller');
const auth       = require('../middlewares/auth.middleware');
const role       = require('../middlewares/role.middleware');

router.get('/',       auth, role('admin'), mhsCtrl.getAll);
router.get('/:id',    auth, role('admin'), mhsCtrl.getById);
router.post('/',      auth, role('admin'), mhsCtrl.create);
router.put('/:id',    auth, role('admin'), mhsCtrl.update);
router.delete('/:id', auth, role('admin'), mhsCtrl.remove);

module.exports = router;