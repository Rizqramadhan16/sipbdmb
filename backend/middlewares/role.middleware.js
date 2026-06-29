const { error } = require('../utils/response');

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return error(res, 'Unauthorized', 401);
    }

    if (!roles.includes(req.user.role)) {
      return error(res, 'Akses ditolak. Anda tidak memiliki izin', 403);
    }

    next();
  };
};