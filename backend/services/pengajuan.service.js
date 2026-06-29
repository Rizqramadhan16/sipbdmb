const PengajuanBimbingan = require('../models/PengajuanBimbingan');
const SlotJadwal         = require('../models/SlotJadwal');
const Mahasiswa          = require('../models/Mahasiswa');
const Dosen              = require('../models/Dosen');
const User               = require('../models/User');
const notifService       = require('./notifikasi.service');

const getAll = async (user) => {
  if (user.role === 'admin') return await PengajuanBimbingan.findAll();

  if (user.role === 'mahasiswa') {
    const mhs = await Mahasiswa.findByUserId(user.id);
    return await PengajuanBimbingan.findByMahasiswa(mhs.id);
  }

  if (user.role === 'dosen') {
    const dosen = await Dosen.findByUserId(user.id);
    return await PengajuanBimbingan.findByDosen(dosen.id);
  }
};

const create = async ({ user_id, slot_id, topik, catatan }) => {
  const mhs = await Mahasiswa.findByUserId(user_id);
  if (!mhs) throw new Error('Profil mahasiswa tidak ditemukan');

  const pending = await PengajuanBimbingan.findPendingByMahasiswa(mhs.id);
  if (pending) throw new Error('Anda masih memiliki pengajuan yang sedang pending');

  const slot = await SlotJadwal.findById(slot_id);
  if (!slot) throw new Error('Slot tidak ditemukan');
  if (slot.status !== 'tersedia') throw new Error('Slot sudah tidak tersedia');

  const id = await PengajuanBimbingan.create({
    mahasiswa_id: mhs.id,
    dosen_id:     slot.dosen_id,
    slot_id,
    topik,
    catatan,
  });

  await SlotJadwal.updateStatus(slot_id, 'tidak_tersedia');

  // Notifikasi ke dosen
  const dosenUser = await User.findById(
    (await Dosen.findById(slot.dosen_id)).user_id
  );
  await notifService.kirim({
    user_id: dosenUser.id,
    judul:   'Pengajuan Bimbingan Baru',
    pesan:   `Mahasiswa ${mhs.nim} mengajukan bimbingan dengan topik "${topik}" pada slot ${slot.tanggal} ${slot.jam_mulai}.`,
  });

  return id;
};

const updateStatus = async (id, user_id, { status, alasan_penolakan }) => {
  const pengajuan = await PengajuanBimbingan.findById(id);
  if (!pengajuan) throw new Error('Pengajuan tidak ditemukan');

  if (status === 'ditolak' && !alasan_penolakan) {
    throw new Error('Alasan penolakan wajib diisi');
  }

  await PengajuanBimbingan.updateStatus(id, { status, alasan_penolakan });

  if (status === 'ditolak') {
    await SlotJadwal.updateStatus(pengajuan.slot_id, 'tersedia');
  }

  // Notifikasi ke mahasiswa
  const mhs     = await Mahasiswa.findById(pengajuan.mahasiswa_id);
  const mhsUser = await User.findById(mhs.user_id);

  const pesan = status === 'disetujui'
    ? `Pengajuan bimbingan Anda telah disetujui. Hadir pada ${pengajuan.tanggal} pukul ${pengajuan.jam_mulai}.`
    : `Pengajuan bimbingan Anda ditolak. Alasan: ${alasan_penolakan}`;

  await notifService.kirim({
    user_id: mhsUser.id,
    judul:   status === 'disetujui' ? 'Pengajuan Disetujui' : 'Pengajuan Ditolak',
    pesan,
  });
};

const selesai = async (id) => {
  const pengajuan = await PengajuanBimbingan.findById(id);
  if (!pengajuan) throw new Error('Pengajuan tidak ditemukan');
  if (pengajuan.status !== 'disetujui') throw new Error('Hanya pengajuan disetujui yang bisa diselesaikan');
  await PengajuanBimbingan.selesai(id);
};

module.exports = { getAll, create, updateStatus, selesai };