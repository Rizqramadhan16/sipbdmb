const notifService = require('../services/notifikasi.service');
const { success, error } = require('../utils/response');

const getAll = async (req, res) => {
  try {
    const data = await notifService.getByUser(req.user.id);
    const unread = await notifService.countUnread(req.user.id);
    return success(res, { notifikasi: data, unread });
  } catch (err) {
    return error(res, err.message);
  }
};

const markRead = async (req, res) => {
  try {
    await notifService.markRead(req.params.id, req.user.id);
    return success(res, null, 'Notifikasi ditandai sudah dibaca');
  } catch (err) {
    return error(res, err.message);
  }
};

const markAllRead = async (req, res) => {
  try {
    await notifService.markAllRead(req.user.id);
    return success(res, null, 'Semua notifikasi ditandai sudah dibaca');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getAll, markRead, markAllRead };