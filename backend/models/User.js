const db = require('../config/db');

const User = {
  findAll: async () => {
    const { rows } = await db.query(
      `SELECT id, nama, email, role, status, created_at
       FROM users WHERE deleted_at IS NULL
       ORDER BY created_at DESC`
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await db.query(
      `SELECT id, nama, email, role, status, created_at
       FROM users WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );
    return rows[0];
  },

  findByEmail: async (email) => {
    const { rows } = await db.query(
      `SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL`,
      [email]
    );
    return rows[0];
  },

  create: async ({ nama, email, password, role, status = 'aktif' }) => {
    const { rows } = await db.query(
      `INSERT INTO users (nama, email, password, role, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [nama, email, password, role, status]
    );
    return rows[0].id;
  },

  update: async (id, data) => {
    const keys   = Object.keys(data);
    const values = Object.values(data);
    const fields = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    await db.query(
      `UPDATE users SET ${fields} WHERE id = $${keys.length + 1}`,
      [...values, id]
    );
  },

  softDelete: async (id) => {
    await db.query(
      `UPDATE users SET deleted_at = NOW() WHERE id = $1`,
      [id]
    );
  },

  resetPassword: async (id, hashedPassword) => {
    await db.query(
      `UPDATE users SET password = $1 WHERE id = $2`,
      [hashedPassword, id]
    );
  },

  changeRole: async (id, role) => {
    await db.query(
      `UPDATE users SET role = $1 WHERE id = $2`,
      [role, id]
    );
  },
};

module.exports = User;