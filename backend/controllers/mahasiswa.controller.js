const mahasiswaService = require('../services/mahasiswa.service');
const { success, error } = require('../utils/response');

const getAll = async (req, res) => {
  try {
    const data = await mahasiswaService.getAll();
    return success(res, data);
  } catch (err) {
    return error(res, err.message);
  }
};

const getById = async (req, res) => {
  try {
    const data = await mahasiswaService.getById(req.params.id);
    return success(res, data);
  } catch (err) {
    return error(res, err.message, 404);
  }
};

const create = async (req, res) => {
  try {
    const data = await mahasiswaService.create(req.body);
    return success(res, data, 'Mahasiswa berhasil ditambahkan', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

const update = async (req, res) => {
  try {
    await mahasiswaService.update(req.params.id, req.body);
    return success(res, null, 'Mahasiswa berhasil diperbarui');
  } catch (err) {
    return error(res, err.message);
  }
};

const remove = async (req, res) => {
  try {
    await mahasiswaService.remove(req.params.id);
    return success(res, null, 'Mahasiswa berhasil dihapus');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getAll, getById, create, update, remove };