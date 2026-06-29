const express           = require('express');
const router            = express.Router();

const authRoutes        = require('./auth.routes');
const dashboardRoutes   = require('./dashboard.routes');
const mahasiswaRoutes   = require('./mahasiswa.routes');
const dosenRoutes       = require('./dosen.routes');
const slotRoutes        = require('./slot.routes');
const pengajuanRoutes   = require('./pengajuan.routes');
const notifikasiRoutes  = require('./notifikasi.routes');
const userRoutes        = require('./user.routes');

router.use('/auth',       authRoutes);
router.use('/dashboard',  dashboardRoutes);
router.use('/mahasiswa',  mahasiswaRoutes);
router.use('/dosen',      dosenRoutes);
router.use('/slot',       slotRoutes);
router.use('/pengajuan',  pengajuanRoutes);
router.use('/notifikasi', notifikasiRoutes);
router.use('/user',       userRoutes);

module.exports = router;