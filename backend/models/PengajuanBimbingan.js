const db = require('../config/db');

const PengajuanBimbingan = {
  findAll: async () => {
    const { rows } = await db.query(
      `SELECT p.id, p.topik, p.catatan, p.status, p.alasan_penolakan,
              p.approved_at, p.created_at,
              m.id as mahasiswa_id, um.nama as nama_mahasiswa, m.nim,
              d.id as dosen_id, ud.nama as nama_dosen,
              s.tanggal, s.jam_mulai, s.jam_selesai
       FROM pengajuan_bimbingan p
       JOIN mahasiswa m  ON m.id = p.mahasiswa_id
       JOIN users um     ON um.id = m.user_id
       JOIN dosen d      ON d.id = p.dosen_id
       JOIN users ud     ON ud.id = d.user_id
       JOIN slot_jadwal s ON s.id = p.slot_id
       ORDER BY p.created_at DESC`
    );
    return rows;
  },

  findByMahasiswa: async (mahasiswa_id) => {
    const { rows } = await db.query(
      `SELECT p.id, p.topik, p.catatan, p.status, p.alasan_penolakan,
              p.approved_at, p.created_at,
              ud.nama as nama_dosen,
              s.tanggal, s.jam_mulai, s.jam_selesai
       FROM pengajuan_bimbingan p
       JOIN dosen d      ON d.id = p.dosen_id
       JOIN users ud     ON ud.id = d.user_id
       JOIN slot_jadwal s ON s.id = p.slot_id
       WHERE p.mahasiswa_id = $1
       ORDER BY p.created_at DESC`,
      [mahasiswa_id]
    );
    return rows;
  },

  findByDosen: async (dosen_id) => {
    const { rows } = await db.query(
      `SELECT p.id, p.topik, p.catatan, p.status, p.alasan_penolakan,
              p.approved_at, p.created_at,
              um.nama as nama_mahasiswa, m.nim,
              s.tanggal, s.jam_mulai, s.jam_selesai
       FROM pengajuan_bimbingan p
       JOIN mahasiswa m  ON m.id = p.mahasiswa_id
       JOIN users um     ON um.id = m.user_id
       JOIN slot_jadwal s ON s.id = p.slot_id
       WHERE p.dosen_id = $1
       ORDER BY p.created_at DESC`,
      [dosen_id]
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await db.query(
      `SELECT p.*, um.nama as nama_mahasiswa, m.nim,
              ud.nama as nama_dosen,
              s.tanggal, s.jam_mulai, s.jam_selesai, s.dosen_id as slot_dosen_id
       FROM pengajuan_bimbingan p
       JOIN mahasiswa m  ON m.id = p.mahasiswa_id
       JOIN users um     ON um.id = m.user_id
       JOIN dosen d      ON d.id = p.dosen_id
       JOIN users ud     ON ud.id = d.user_id
       JOIN slot_jadwal s ON s.id = p.slot_id
       WHERE p.id = $1`,
      [id]
    );
    return rows[0];
  },

  findPendingByMahasiswa: async (mahasiswa_id) => {
    const { rows } = await db.query(
      `SELECT id FROM pengajuan_bimbingan
       WHERE mahasiswa_id = $1 AND status = 'pending'`,
      [mahasiswa_id]
    );
    return rows[0];
  },

  create: async ({ mahasiswa_id, dosen_id, slot_id, topik, catatan }) => {
    const { rows } = await db.query(
      `INSERT INTO pengajuan_bimbingan
       (mahasiswa_id, dosen_id, slot_id, topik, catatan)
       VALUES ($1,$2,$3,$4,$5) RETURNING id`,
      [mahasiswa_id, dosen_id, slot_id, topik, catatan]
    );
    return rows[0].id;
  },

  updateStatus: async (id, { status, alasan_penolakan = null }) => {
    const approved_at = status === 'disetujui' ? new Date() : null;
    await db.query(
      `UPDATE pengajuan_bimbingan
       SET status=$1, alasan_penolakan=$2, approved_at=$3
       WHERE id=$4`,
      [status, alasan_penolakan, approved_at, id]
    );
  },

  selesai: async (id) => {
    await db.query(
      `UPDATE pengajuan_bimbingan SET status='selesai' WHERE id=$1`,
      [id]
    );
  },
};

module.exports = PengajuanBimbingan;