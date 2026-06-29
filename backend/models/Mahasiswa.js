const db = require('../config/db');

const Mahasiswa = {
  findAll: async () => {
    const { rows } = await db.query(
      `SELECT m.id, m.nim, m.prodi, m.angkatan,
              u.id as user_id, u.nama, u.email, u.status
       FROM mahasiswa m
       JOIN users u ON u.id = m.user_id
       WHERE u.deleted_at IS NULL
       ORDER BY m.angkatan DESC, u.nama ASC`
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await db.query(
      `SELECT m.id, m.nim, m.prodi, m.angkatan,
              u.id as user_id, u.nama, u.email, u.status
       FROM mahasiswa m
       JOIN users u ON u.id = m.user_id
       WHERE m.id = $1 AND u.deleted_at IS NULL`,
      [id]
    );
    return rows[0];
  },

  findByUserId: async (user_id) => {
    const { rows } = await db.query(
      `SELECT * FROM mahasiswa WHERE user_id = $1`,
      [user_id]
    );
    return rows[0];
  },

  create: async ({ user_id, nim, prodi, angkatan }) => {
    const { rows } = await db.query(
      `INSERT INTO mahasiswa (user_id, nim, prodi, angkatan)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [user_id, nim, prodi, angkatan]
    );
    return rows[0].id;
  },

  update: async (id, { nim, prodi, angkatan }) => {
    await db.query(
      `UPDATE mahasiswa SET nim = $1, prodi = $2, angkatan = $3 WHERE id = $4`,
      [nim, prodi, angkatan, id]
    );
  },
};

module.exports = Mahasiswa;