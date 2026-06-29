const { Pool } = require('pg');
const dotenv   = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

pool.connect()
  .then(client => {
    console.log('✅ Database Supabase terhubung');
    client.release();
  })
  .catch(err => {
    console.error('❌ Gagal koneksi database:', err.message);
  });

module.exports = pool;