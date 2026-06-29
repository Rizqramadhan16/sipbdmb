const db = require('../config/db');

const Dosen = {
  findAll: async () => {
    const { rows } = await db.query(
      `SELECT d.id, d.nidn, d.bidang_keahlian,
              u.id as user_id, u.nama, u.email, u.status
       FROM dosen d
       JOIN users u ON u.id = d.user_id
       WHERE u.deleted_at IS NULL
       ORDER BY u.nama ASC`
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await db.query(
      `SELECT d.id, d.nidn, d.bidang_keahlian,
              u.id as user_id, u.nama, u.email, u.status
       FROM dosen d
       JOIN users u ON u.id = d.user_id
       WHERE d.id = $1 AND u.deleted_at IS NULL`,
      [id]
    );
    return rows[0];
  },

  findByUserId: async (user_id) => {
    const { rows } = await db.query(
      `SELECT * FROM dosen WHERE user_id = $1`,
      [user_id]
    );
    return rows[0];
  },

  create: async ({ user_id, nidn, bidang_keahlian }) => {
    const { rows } = await db.query(
      `INSERT INTO dosen (user_id, nidn, bidang_keahlian)
       VALUES ($1, $2, $3) RETURNING id`,
      [user_id, nidn, bidang_keahlian]
    );
    return rows[0].id;
  },

  update: async (id, { nidn, bidang_keahlian }) => {
    await db.query(
      `UPDATE dosen SET nidn = $1, bidang_keahlian = $2 WHERE id = $3`,
      [nidn, bidang_keahlian, id]
    );
  },
};

module.exports = Dosen;