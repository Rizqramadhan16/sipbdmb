const bcrypt   = require('bcryptjs');
const User     = require('../models/User');
const Mahasiswa = require('../models/Mahasiswa');
const Dosen    = require('../models/Dosen');
const { generate } = require('../utils/jwt');

const login = async ({ email, password }) => {
  const user = await User.findByEmail(email);
  if (!user) throw new Error('Email tidak ditemukan');
  if (user.status === 'nonaktif') throw new Error('Akun Anda dinonaktifkan');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Password salah');

  let profile = null;
  if (user.role === 'mahasiswa') {
    profile = await Mahasiswa.findByUserId(user.id);
  } else if (user.role === 'dosen') {
    profile = await Dosen.findByUserId(user.id);
  }

  const token = generate({
    id:         user.id,
    nama:       user.nama,
    email:      user.email,
    role:       user.role,
    profile_id: profile ? profile.id : null,
  });

  return {
    token,
    user: {
      id:         user.id,
      nama:       user.nama,
      email:      user.email,
      role:       user.role,
      profile_id: profile ? profile.id : null,
    },
  };
};

const getProfile = async (user_id) => {
  const user = await User.findById(user_id);
  if (!user) throw new Error('User tidak ditemukan');

  let profile = null;
  if (user.role === 'mahasiswa') {
    profile = await Mahasiswa.findByUserId(user_id);
  } else if (user.role === 'dosen') {
    profile = await Dosen.findByUserId(user_id);
  }

  return { ...user, profile };
};

module.exports = { login, getProfile };