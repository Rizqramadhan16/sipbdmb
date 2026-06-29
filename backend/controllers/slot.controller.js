const slotService = require('../services/slot.service');
const { success, error } = require('../utils/response');

const getAll = async (req, res) => {
  try {
    const { role, id } = req.user;
    let data;
    if (role === 'dosen') {
      data = await slotService.getByDosen(id);
    } else if (role === 'mahasiswa') {
      data = await slotService.getAvailable();
    } else {
      data = await slotService.getAll();
    }
    return success(res, data);
  } catch (err) {
    return error(res, err.message);
  }
};

const create = async (req, res) => {
  try {
    const id = await slotService.create({ user_id: req.user.id, ...req.body });
    return success(res, { id }, 'Slot berhasil dibuat', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

const update = async (req, res) => {
  try {
    await slotService.update(req.params.id, req.user.id, req.body);
    return success(res, null, 'Slot berhasil diperbarui');
  } catch (err) {
    return error(res, err.message);
  }
};

const remove = async (req, res) => {
  try {
    await slotService.remove(req.params.id, req.user.id);
    return success(res, null, 'Slot berhasil dihapus');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getAll, create, update, remove };