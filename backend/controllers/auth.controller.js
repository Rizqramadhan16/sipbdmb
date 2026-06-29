const authService = require('../services/auth.service');
const { success, error } = require('../utils/response');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return error(res, 'Email dan password wajib diisi', 422);
    const data = await authService.login({ email, password });
    return success(res, data, 'Login berhasil');
  } catch (err) {
    return error(res, err.message, 401);
  }
};

const logout = (req, res) => {
  return success(res, null, 'Logout berhasil');
};

const profile = async (req, res) => {
  try {
    const data = await authService.getProfile(req.user.id);
    return success(res, data, 'Profil berhasil diambil');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { login, logout, profile };