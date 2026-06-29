const bcrypt = require('bcryptjs');
const User   = require('../models/User');
const { success, error } = require('../utils/response');

const getAll = async (req, res) => {
  try {
    const data = await User.findAll();
    return success(res, data);
  } catch (err) {
    return error(res, err.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return error(res, 'Password baru wajib diisi', 422);
    const hashed = await bcrypt.hash(password, 10);
    await User.resetPassword(req.params.id, hashed);
    return success(res, null, 'Password berhasil direset');
  } catch (err) {
    return error(res, err.message);
  }
};

const changeRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) return error(res, 'Role wajib diisi', 422);
    await User.changeRole(req.params.id, role);
    return success(res, null, 'Role berhasil diubah');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getAll, resetPassword, changeRole };