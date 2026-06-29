const express    = require('express');
const router     = express.Router();
const slotCtrl   = require('../controllers/slot.controller');
const auth       = require('../middlewares/auth.middleware');
const role       = require('../middlewares/role.middleware');

router.get('/',       auth, slotCtrl.getAll);
router.post('/',      auth, role('dosen'), slotCtrl.create);
router.put('/:id',    auth, role('dosen'), slotCtrl.update);
router.delete('/:id', auth, role('dosen'), slotCtrl.remove);

module.exports = router;