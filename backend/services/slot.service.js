const SlotJadwal = require('../models/SlotJadwal');
const Dosen      = require('../models/Dosen');

const getAll = async () => {
  return await SlotJadwal.findAll();
};

const getAvailable = async () => {
  return await SlotJadwal.findAvailable();
};

const getByDosen = async (user_id) => {
  const dosen = await Dosen.findByUserId(user_id);
  if (!dosen) throw new Error('Profil dosen tidak ditemukan');
  return await SlotJadwal.findByDosen(dosen.id);
};

const create = async ({ user_id, tanggal, jam_mulai, jam_selesai }) => {
  const dosen = await Dosen.findByUserId(user_id);
  if (!dosen) throw new Error('Profil dosen tidak ditemukan');
  return await SlotJadwal.create({ dosen_id: dosen.id, tanggal, jam_mulai, jam_selesai });
};

const update = async (id, user_id, { tanggal, jam_mulai, jam_selesai, status }) => {
  const slot  = await SlotJadwal.findById(id);
  if (!slot) throw new Error('Slot tidak ditemukan');

  const dosen = await Dosen.findByUserId(user_id);
  if (slot.dosen_id !== dosen.id) throw new Error('Anda tidak berhak mengubah slot ini');

  await SlotJadwal.update(id, { tanggal, jam_mulai, jam_selesai, status });
};

const remove = async (id, user_id) => {
  const slot  = await SlotJadwal.findById(id);
  if (!slot) throw new Error('Slot tidak ditemukan');

  const dosen = await Dosen.findByUserId(user_id);
  if (slot.dosen_id !== dosen.id) throw new Error('Anda tidak berhak menghapus slot ini');

  await SlotJadwal.delete(id);
};

module.exports = { getAll, getAvailable, getByDosen, create, update, remove };