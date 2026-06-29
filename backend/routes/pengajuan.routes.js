const express        = require('express');
const router         = express.Router();
const pengajuanCtrl  = require('../controllers/pengajuan.controller');
const auth           = require('../middlewares/auth.middleware');
const role           = require('../middlewares/role.middleware');

router.get('/',                auth, pengajuanCtrl.getAll);
router.post('/',               auth, role('mahasiswa'), pengajuanCtrl.create);
router.put('/:id',             auth, role('dosen', 'admin'), pengajuanCtrl.updateStatus);
router.patch('/:id/selesai',   auth, role('dosen', 'admin'), pengajuanCtrl.selesai);

module.exports = router;