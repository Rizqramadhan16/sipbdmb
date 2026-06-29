const success = (res, data = null, message = 'Berhasil', code = 200) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};

const error = (res, message = 'Terjadi kesalahan', code = 400) => {
  return res.status(code).json({
    success: false,
    message,
    data: null,
  });
};

module.exports = { success, error };