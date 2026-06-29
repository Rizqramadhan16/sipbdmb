USE sipbdmb;

-- ------------------------------------------------------------
-- Users
-- Password default semua akun: Password123!
-- Hash bcrypt di bawah adalah untuk: Password123!
-- ------------------------------------------------------------
INSERT INTO users (nama, email, password, role, status) VALUES
(
  'Admin Sistem',
  'admin@sipbdmb.com',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'admin',
  'aktif'
),
(
  'Dr. Budi Santoso, M.Kom',
  'budi@sipbdmb.com',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'dosen',
  'aktif'
),
(
  'Dr. Siti Rahayu, M.T',
  'siti@sipbdmb.com',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'dosen',
  'aktif'
),
(
  'Ahmad Fauzi',
  'ahmad@sipbdmb.com',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'mahasiswa',
  'aktif'
),
(
  'Rina Kartika',
  'rina@sipbdmb.com',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'mahasiswa',
  'aktif'
);

-- ------------------------------------------------------------
-- Dosen
-- ------------------------------------------------------------
INSERT INTO dosen (user_id, nidn, bidang_keahlian) VALUES
(2, '0011018801', 'Rekayasa Perangkat Lunak'),
(3, '0022029902', 'Kecerdasan Buatan');

-- ------------------------------------------------------------
-- Mahasiswa
-- ------------------------------------------------------------
INSERT INTO mahasiswa (user_id, nim, prodi, angkatan) VALUES
(4, '2021001001', 'Teknik Informatika', 2021),
(5, '2021001002', 'Teknik Informatika', 2021);

-- ------------------------------------------------------------
-- Slot Jadwal (milik dosen 1 = Dr. Budi)
-- ------------------------------------------------------------
INSERT INTO slot_jadwal (dosen_id, tanggal, jam_mulai, jam_selesai, status) VALUES
(1, '2026-07-07', '08:00:00', '08:30:00', 'tersedia'),
(1, '2026-07-07', '09:00:00', '09:30:00', 'tersedia'),
(1, '2026-07-07', '10:00:00', '10:30:00', 'tersedia'),
(1, '2026-07-08', '08:00:00', '08:30:00', 'tersedia'),
(1, '2026-07-08', '13:00:00', '13:30:00', 'tersedia'),

-- Slot Jadwal (milik dosen 2 = Dr. Siti)
(2, '2026-07-07', '13:00:00', '13:30:00', 'tersedia'),
(2, '2026-07-07', '14:00:00', '14:30:00', 'tersedia'),
(2, '2026-07-09', '09:00:00', '09:30:00', 'tersedia');