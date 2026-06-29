const db = require('../config/db');

const Notifikasi = {
  findByUser: async (user_id) => {
    const { rows } = await db.query(
      `SELECT * FROM notifikasi WHERE user_id=$1 ORDER BY created_at DESC`,
      [user_id]
    );
    return rows;
  },

  findAll: async () => {
    const { rows } = await db.query(
      `SELECT n.*, u.nama as nama_user, u.role
       FROM notifikasi n
       JOIN users u ON u.id = n.user_id
       ORDER BY n.created_at DESC`
    );
    return rows;
  },

  create: async ({ user_id, judul, pesan }) => {
    const { rows } = await db.query(
      `INSERT INTO notifikasi (user_id, judul, pesan)
       VALUES ($1,$2,$3) RETURNING id`,
      [user_id, judul, pesan]
    );
    return rows[0].id;
  },

  markRead: async (id, user_id) => {
    await db.query(
      `UPDATE notifikasi SET is_read=1 WHERE id=$1 AND user_id=$2`,
      [id, user_id]
    );
  },

  markAllRead: async (user_id) => {
    await db.query(
      `UPDATE notifikasi SET is_read=1 WHERE user_id=$1`,
      [user_id]
    );
  },

  countUnread: async (user_id) => {
    const { rows } = await db.query(
      `SELECT COUNT(*) as total FROM notifikasi
       WHERE user_id=$1 AND is_read=0`,
      [user_id]
    );
    return parseInt(rows[0].total);
  },
};

module.exports = Notifikasi;