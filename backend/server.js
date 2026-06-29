const express   = require('express');
const cors      = require('cors');
const dotenv    = require('dotenv');

dotenv.config();

const app    = express();
const PORT   = process.env.PORT || 3000;
const routes = require('./routes/index');

// ── Middleware Global ──────────────────────────────────────
app.use(cors({
  origin:      process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────
app.use('/api', routes);

// ── Health Check ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'SIPBDMB API berjalan',
    version: '1.0.0',
  });
});

// ── 404 Handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan`,
  });
});

// ── Error Handler ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// ── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});