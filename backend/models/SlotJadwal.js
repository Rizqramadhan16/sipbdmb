const db = require('../config/db');

const SlotJadwal = {
  findAll: async () => {
    const { rows } = await db.query(
      `SELECT s.id, s.tanggal, s.jam_mulai, s.jam_selesai, s.status,
              d.id as dosen_id, u.nama as nama_dosen
       FROM slot_jadwal s
       JOIN dosen d ON d.id = s.dosen_id
       JOIN users u ON u.id = d.user_id
       ORDER BY s.tanggal ASC, s.jam_mulai ASC`
    );
    return rows;
  },

  findAvailable: async () => {
    const { rows } = await db.query(
      `SELECT s.id, s.tanggal, s.jam_mulai, s.jam_selesai, s.status,
              d.id as dosen_id, u.nama as nama_dosen
       FROM slot_jadwal s
       JOIN dosen d ON d.id = s.dosen_id
       JOIN users u ON u.id = d.user_id
       WHERE s.status = 'tersedia' AND s.tanggal >= CURRENT_DATE
       ORDER BY s.tanggal ASC, s.jam_mulai ASC`
    );
    return rows;
  },

  findByDosen: async (dosen_id) => {
    const { rows } = await db.query(
      `SELECT * FROM slot_jadwal WHERE dosen_id = $1
       ORDER BY tanggal ASC, jam_mulai ASC`,
      [dosen_id]
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await db.query(
      `SELECT s.*, u.nama as nama_dosen
       FROM slot_jadwal s
       JOIN dosen d ON d.id = s.dosen_id
       JOIN users u ON u.id = d.user_id
       WHERE s.id = $1`,
      [id]
    );
    return rows[0];
  },

  create: async ({ dosen_id, tanggal, jam_mulai, jam_selesai }) => {
    const { rows } = await db.query(
      `INSERT INTO slot_jadwal (dosen_id, tanggal, jam_mulai, jam_selesai)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [dosen_id, tanggal, jam_mulai, jam_selesai]
    );
    return rows[0].id;
  },

  update: async (id, { tanggal, jam_mulai, jam_selesai, status }) => {
    await db.query(
      `UPDATE slot_jadwal
       SET tanggal=$1, jam_mulai=$2, jam_selesai=$3, status=$4
       WHERE id=$5`,
      [tanggal, jam_mulai, jam_selesai, status, id]
    );
  },

  updateStatus: async (id, status) => {
    await db.query(
      `UPDATE slot_jadwal SET status=$1 WHERE id=$2`,
      [status, id]
    );
  },

  delete: async (id) => {
    await db.query(`DELETE FROM slot_jadwal WHERE id=$1`, [id]);
  },
};

module.exports = SlotJadwal;