const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

/* ===============================
   GLOBAL MIDDLEWARE
================================ */
app.use(cors()); // You can restrict origins later
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/* ===============================
   ROUTES
================================ */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ministries', require('./routes/ministries'));
app.use('/api/media', require('./routes/media'));
app.use('/api/payments', require('./routes/payments'));

/* ===============================
   HEALTH CHECK
================================ */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Believer’s Gallery API is running'
  });
});

/* ===============================
   GLOBAL ERROR HANDLER
   (NO throw err ANYWHERE)
================================ */
app.use((err, req, res, next) => {
  console.error('❌ ERROR:', err.stack || err.message);
  res.status(500).json({
    error: 'Internal server error'
  });
});

/* ===============================
   START SERVER
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Believer’s Gallery API running on port ${PORT}`);
});
