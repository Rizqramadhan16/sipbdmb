-- ============================================================
-- SCHEMA: Sistem Informasi Penjadwalan Bimbingan
-- Program Studi Teknik Informatika
-- ============================================================

CREATE DATABASE IF NOT EXISTS sipbdmb;
USE sipbdmb;

-- ------------------------------------------------------------
-- Tabel: users
-- ------------------------------------------------------------
CREATE TABLE users (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  nama       VARCHAR(100)  NOT NULL,
  email      VARCHAR(100)  NOT NULL UNIQUE,
  password   VARCHAR(255)  NOT NULL,
  role       ENUM('admin', 'dosen', 'mahasiswa') NOT NULL,
  status     ENUM('aktif', 'nonaktif') NOT NULL DEFAULT 'aktif',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME DEFAULT NULL
);

-- ------------------------------------------------------------
-- Tabel: mahasiswa
-- ------------------------------------------------------------
CREATE TABLE mahasiswa (
  id       INT PRIMARY KEY AUTO_INCREMENT,
  user_id  INT  NOT NULL UNIQUE,
  nim      VARCHAR(20)  NOT NULL UNIQUE,
  prodi    VARCHAR(100) NOT NULL DEFAULT 'Teknik Informatika',
  angkatan YEAR NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Tabel: dosen
-- ------------------------------------------------------------
CREATE TABLE dosen (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  user_id         INT          NOT NULL UNIQUE,
  nidn            VARCHAR(20)  NOT NULL UNIQUE,
  bidang_keahlian VARCHAR(150) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Tabel: slot_jadwal
-- ------------------------------------------------------------
CREATE TABLE slot_jadwal (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  dosen_id    INT  NOT NULL,
  tanggal     DATE NOT NULL,
  jam_mulai   TIME NOT NULL,
  jam_selesai TIME NOT NULL,
  status      ENUM('tersedia', 'tidak_tersedia') NOT NULL DEFAULT 'tersedia',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (dosen_id) REFERENCES dosen(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Tabel: pengajuan_bimbingan
-- ------------------------------------------------------------
CREATE TABLE pengajuan_bimbingan (
  id               INT PRIMARY KEY AUTO_INCREMENT,
  mahasiswa_id     INT          NOT NULL,
  dosen_id         INT          NOT NULL,
  slot_id          INT          NOT NULL,
  topik            VARCHAR(255) NOT NULL,
  catatan          TEXT,
  status           ENUM('pending', 'disetujui', 'ditolak', 'selesai') NOT NULL DEFAULT 'pending',
  alasan_penolakan TEXT         DEFAULT NULL,
  approved_at      DATETIME     DEFAULT NULL,
  created_at       DATETIME     DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (mahasiswa_id) REFERENCES mahasiswa(id) ON DELETE CASCADE,
  FOREIGN KEY (dosen_id)     REFERENCES dosen(id)     ON DELETE CASCADE,
  FOREIGN KEY (slot_id)      REFERENCES slot_jadwal(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Tabel: notifikasi
-- ------------------------------------------------------------
CREATE TABLE notifikasi (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  user_id    INT          NOT NULL,
  judul      VARCHAR(255) NOT NULL,
  pesan      TEXT         NOT NULL,
  is_read    TINYINT(1)   NOT NULL DEFAULT 0,
  created_at DATETIME     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);