const pengajuanService = require('../services/pengajuan.service');
const { success, error } = require('../utils/response');

const getAll = async (req, res) => {
  try {
    const data = await pengajuanService.getAll(req.user);
    return success(res, data);
  } catch (err) {
    return error(res, err.message);
  }
};

const create = async (req, res) => {
  try {
    const { slot_id, topik, catatan } = req.body;
    if (!slot_id || !topik) return error(res, 'Slot dan topik wajib diisi', 422);
    const id = await pengajuanService.create({ user_id: req.user.id, slot_id, topik, catatan });
    return success(res, { id }, 'Pengajuan berhasil dikirim', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status, alasan_penolakan } = req.body;
    if (!status) return error(res, 'Status wajib diisi', 422);
    await pengajuanService.updateStatus(req.params.id, req.user.id, { status, alasan_penolakan });
    return success(res, null, 'Status pengajuan berhasil diperbarui');
  } catch (err) {
    return error(res, err.message);
  }
};

const selesai = async (req, res) => {
  try {
    await pengajuanService.selesai(req.params.id);
    return success(res, null, 'Bimbingan ditandai selesai');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getAll, create, updateStatus, selesai };