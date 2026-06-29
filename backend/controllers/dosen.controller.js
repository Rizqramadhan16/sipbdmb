const dosenService = require('../services/dosen.service');
const { success, error } = require('../utils/response');

const getAll = async (req, res) => {
  try {
    const data = await dosenService.getAll();
    return success(res, data);
  } catch (err) {
    return error(res, err.message);
  }
};

const getById = async (req, res) => {
  try {
    const data = await dosenService.getById(req.params.id);
    return success(res, data);
  } catch (err) {
    return error(res, err.message, 404);
  }
};

const create = async (req, res) => {
  try {
    const data = await dosenService.create(req.body);
    return success(res, data, 'Dosen berhasil ditambahkan', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

const update = async (req, res) => {
  try {
    await dosenService.update(req.params.id, req.body);
    return success(res, null, 'Dosen berhasil diperbarui');
  } catch (err) {
    return error(res, err.message);
  }
};

const remove = async (req, res) => {
  try {
    await dosenService.remove(req.params.id);
    return success(res, null, 'Dosen berhasil dihapus');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getAll, getById, create, update, remove };