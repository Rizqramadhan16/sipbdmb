const bcrypt  = require('bcryptjs');
const User    = require('../models/User');
const Dosen   = require('../models/Dosen');

const getAll = async () => {
  return await Dosen.findAll();
};

const getById = async (id) => {
  const data = await Dosen.findById(id);
  if (!data) throw new Error('Dosen tidak ditemukan');
  return data;
};

const create = async ({ nama, email, password, nidn, bidang_keahlian }) => {
  const existing = await User.findByEmail(email);
  if (existing) throw new Error('Email sudah digunakan');

  const hashed  = await bcrypt.hash(password, 10);
  const user_id = await User.create({ nama, email, password: hashed, role: 'dosen' });
  await Dosen.create({ user_id, nidn, bidang_keahlian });

  return { user_id, nidn };
};

const update = async (id, { nama, email, nidn, bidang_keahlian, status }) => {
  const dosen = await Dosen.findById(id);
  if (!dosen) throw new Error('Dosen tidak ditemukan');

  await User.update(dosen.user_id, { nama, email, status });
  await Dosen.update(id, { nidn, bidang_keahlian });
};

const remove = async (id) => {
  const dosen = await Dosen.findById(id);
  if (!dosen) throw new Error('Dosen tidak ditemukan');
  await User.softDelete(dosen.user_id);
};

module.exports = { getAll, getById, create, update, remove };