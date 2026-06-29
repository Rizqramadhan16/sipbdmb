const { verify } = require('../utils/jwt');
const { error }  = require('../utils/response');

module.exports = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header) {
    return error(res, 'Token tidak ditemukan', 401);
  }

  const token = header.split(' ')[1];

  if (!token) {
    return error(res, 'Format token tidak valid', 401);
  }

  try {
    req.user = verify(token);
    next();
  } catch (err) {
    return error(res, 'Token tidak valid atau sudah kadaluarsa', 401);
  }
};