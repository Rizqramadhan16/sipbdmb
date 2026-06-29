const bcrypt    = require('bcryptjs');
const User      = require('../models/User');
const Mahasiswa = require('../models/Mahasiswa');

const getAll = async () => {
  return await Mahasiswa.findAll();
};

const getById = async (id) => {
  const data = await Mahasiswa.findById(id);
  if (!data) throw new Error('Mahasiswa tidak ditemukan');
  return data;
};

const create = async ({ nama, email, password, nim, prodi, angkatan }) => {
  const existing = await User.findByEmail(email);
  if (existing) throw new Error('Email sudah digunakan');

  const hashed  = await bcrypt.hash(password, 10);
  const user_id = await User.create({ nama, email, password: hashed, role: 'mahasiswa' });
  await Mahasiswa.create({ user_id, nim, prodi, angkatan });

  return { user_id, nim };
};

const update = async (id, { nama, email, nim, prodi, angkatan, status }) => {
  const mhs = await Mahasiswa.findById(id);
  if (!mhs) throw new Error('Mahasiswa tidak ditemukan');

  await User.update(mhs.user_id, { nama, email, status });
  await Mahasiswa.update(id, { nim, prodi, angkatan });
};

const remove = async (id) => {
  const mhs = await Mahasiswa.findById(id);
  if (!mhs) throw new Error('Mahasiswa tidak ditemukan');
  await User.softDelete(mhs.user_id);
};

module.exports = { getAll, getById, create, update, remove };