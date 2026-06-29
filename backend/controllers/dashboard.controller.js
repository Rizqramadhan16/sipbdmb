const db = require('../config/db');
const { success, error } = require('../utils/response');

const index = async (req, res) => {
  try {
    const { role, id } = req.user;

    if (role === 'admin') {
      const { rows: [mhs] }      = await db.query(`SELECT COUNT(*) as total FROM mahasiswa`);
      const { rows: [dsn] }      = await db.query(`SELECT COUNT(*) as total FROM dosen`);
      const { rows: [slot] }     = await db.query(`SELECT COUNT(*) as total FROM slot_jadwal`);
      const { rows: [pngj] }     = await db.query(`SELECT COUNT(*) as total FROM pengajuan_bimbingan`);
      const { rows: statistik }  = await db.query(
        `SELECT status, COUNT(*) as total FROM pengajuan_bimbingan GROUP BY status`
      );
      return success(res, {
        total_mahasiswa:  parseInt(mhs.total),
        total_dosen:      parseInt(dsn.total),
        total_slot:       parseInt(slot.total),
        total_pengajuan:  parseInt(pngj.total),
        statistik_status: statistik,
      });
    }

    if (role === 'dosen') {
      const { rows: d }  = await db.query(`SELECT id FROM dosen WHERE user_id=$1`, [id]);
      const dosen_id     = d[0]?.id;

      const { rows: [pb] } = await db.query(
        `SELECT COUNT(*) as total FROM pengajuan_bimbingan WHERE dosen_id=$1 AND status='pending'`, [dosen_id]);
      const { rows: [jh] } = await db.query(
        `SELECT COUNT(*) as total FROM slot_jadwal WHERE dosen_id=$1 AND tanggal=CURRENT_DATE`, [dosen_id]);
      const { rows: [sa] } = await db.query(
        `SELECT COUNT(*) as total FROM slot_jadwal WHERE dosen_id=$1 AND status='tersedia'`, [dosen_id]);
      const { rows: st }   = await db.query(
        `SELECT status, COUNT(*) as total FROM pengajuan_bimbingan WHERE dosen_id=$1 GROUP BY status`, [dosen_id]);

      return success(res, {
        pengajuan_baru:   parseInt(pb.total),
        jadwal_hari_ini:  parseInt(jh.total),
        slot_aktif:       parseInt(sa.total),
        statistik_status: st,
      });
    }

    if (role === 'mahasiswa') {
      const { rows: m }    = await db.query(`SELECT id FROM mahasiswa WHERE user_id=$1`, [id]);
      const mahasiswa_id   = m[0]?.id;

      const { rows: [tp] } = await db.query(
        `SELECT COUNT(*) as total FROM pengajuan_bimbingan WHERE mahasiswa_id=$1`, [mahasiswa_id]);
      const { rows: [sl] } = await db.query(
        `SELECT status FROM pengajuan_bimbingan WHERE mahasiswa_id=$1 ORDER BY created_at DESC LIMIT 1`, [mahasiswa_id]);
      const { rows: [jb] } = await db.query(
        `SELECT p.id, s.tanggal, s.jam_mulai, s.jam_selesai, ud.nama as nama_dosen
         FROM pengajuan_bimbingan p
         JOIN slot_jadwal s ON s.id=p.slot_id
         JOIN dosen d ON d.id=p.dosen_id
         JOIN users ud ON ud.id=d.user_id
         WHERE p.mahasiswa_id=$1 AND p.status='disetujui' AND s.tanggal>=CURRENT_DATE
         ORDER BY s.tanggal ASC LIMIT 1`, [mahasiswa_id]);

      return success(res, {
        total_pengajuan:   parseInt(tp.total),
        status_terakhir:   sl?.status || null,
        jadwal_berikutnya: jb || null,
      });
    }

  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { index };