const Notifikasi = require('../models/Notifikasi');

const kirim = async ({ user_id, judul, pesan }) => {
  return await Notifikasi.create({ user_id, judul, pesan });
};

const getByUser = async (user_id) => {
  return await Notifikasi.findByUser(user_id);
};

const getAll = async () => {
  return await Notifikasi.findAll();
};

const markRead = async (id, user_id) => {
  return await Notifikasi.markRead(id, user_id);
};

const markAllRead = async (user_id) => {
  return await Notifikasi.markAllRead(user_id);
};

const countUnread = async (user_id) => {
  return await Notifikasi.countUnread(user_id);
};

module.exports = { kirim, getByUser, getAll, markRead, markAllRead, countUnread };